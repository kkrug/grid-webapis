
require('dotenv').config()

const atob = require("atob");
const fs = require('fs');
const { google } = require('googleapis');
const isEmpty = require('lodash/isEmpty');
const customErrors = require("../helpers/customErrors");
const { ADMIN_ERROR_MSG, JOB_SUCCESS_MSG, CONFIG_FILE_PATH, ENVIRONMENTS } = require("../helpers/constants");

const gaPrivateKeyEnv = process.env.GA_PRIVATE_KEY;
let envConfig = {};
// if (isEmpty(gaPrivateKeyEnv)) {
//   try {
//     let configFile = fs.readFileSync(CONFIG_FILE_PATH);
//     const configJson = JSON.parse(configFile);
//     envConfig = ENVIRONMENTS.DEV === process.env.NODE_ENV ? configJson.dev : configJson.prod;
//     console.log('FOR DEBUGGING envConfigs:', envConfig);
//   }
//   catch (err) {
//     console.log('error in s3, ebs confgurations: ', err);
//   }
// }
const GA_PRIVATE_KEY = gaPrivateKeyEnv ? gaPrivateKeyEnv : envConfig.GA_PRIVATE_KEY;
const authClient = null; 
//commenting below line - error in deploy
//const authClient = new google.auth.JWT(process.env.GA_CLIENT_EMAIL, null, atob(GA_PRIVATE_KEY), process.env.GA_SCOPES);
const WATCH_DETAILS = "/watch-details/";
const SLASH = "/";
const VIDEO = "/video/";

const {
  storeRecommendedVideos,
  recieveRecommendedVideos
} = require("../models/recommended-videos");

const getParams = (startDate, endDate) => {
  return {
    "auth": authClient,
    "headers": {
      "Content-Type": "application/json"
    },
    "resource": {
      "reportRequests": [
        {
          "viewId": process.env.GA_VIEW_ID, // your view Id from goofle
          "samplingLevel": "DEFAULT",
          "filtersExpression": `ga:pagepath=@/${process.env.GA_VIDEO_PATH}/`,
          "dateRanges": [
            {
              "startDate": startDate,
              "endDate": endDate
            }
          ],
          "metrics": [
            {
              "expression": "ga:pageviews",
            }
          ],
          "dimensions": [
            {
              "name": "ga:pagePath"
            }
          ]
        }
      ]
    }
  };
}

const processVideos = async (sectionDetails) => {
  for (const section in sectionDetails) {
    console.log(`FOR DEBUGGING: ${section} : ${JSON.stringify(sectionDetails[section])}`)

    await storeRecommendedVideos(`${section}`, sectionDetails[section]);
  }
  return true;
}

const mapSectionVideos = async (watchData) => {
  const sectionDetails = {};
  for (const video of watchData) {
    const sectionId = video.sectionId;
    if (sectionId) {
      if (sectionDetails[`${sectionId}`]) {
        if (video.videoId) {
          sectionDetails[`${sectionId}`][`${video.videoId}`] = video.views;
        }
      }
      else {
        if (video.videoId) {
          sectionDetails[`${sectionId}`] = { [video.videoId]: video.views };
        }
      }
    }
  }
  return processVideos(sectionDetails);
}

const getGAData = (startDate, endDate) => {
  return google.analyticsreporting('v4').reports.batchGet(getParams(startDate, endDate));
}

exports.processRecommendedVideos = async (startDate, endDate) => {
  try {
    const res = await getGAData(startDate, endDate);
    // console.log('FOR DEBUGGING: Analytics Data ', JSON.stringify(res?.data?.reports[0]?.data?.rows));
    if (res) {
      const metricsData = res?.data?.reports[0]?.data?.rows;
      const watchData = metricsData?.map((metric) => {
        const url = metric?.dimensions[0];
        var urlParts = url?.split("/");
        var videoId = urlParts?.pop();
        const video_idx = url.indexOf(VIDEO);
        const video_len = VIDEO.length;
        const sectionId = url?.slice(video_idx + video_len, url.indexOf('/', video_idx + video_len));
        if (isEmpty(videoId)) {
          videoId = urlParts?.[urlParts?.length - 1];
        }
        //old code: commeted now. Will be removed later after stable release
        /* const watch_details_idx = url.indexOf(WATCH_DETAILS);
           const watch_details_len = WATCH_DETAILS.length;
           const sectionId = url?.slice(url.indexOf(SLASH) + SLASH.length, url.indexOf(SLASH, url.indexOf(SLASH) + SLASH.length));
           const videoId = url?.slice(watch_details_idx + watch_details_len, url.indexOf('/', watch_details_idx + watch_details_len));
        */
        const views = metric?.metrics[0]?.values[0];
        return { sectionId, videoId, views };
      });
      await mapSectionVideos(watchData);
      return JOB_SUCCESS_MSG;
    }
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
}

const arrangeSections = (topSections) => {
  return topSections.sort((firstSection, secondSection) => {
    let compareVal = 0;
    if (firstSection.views > secondSection.views)
      compareVal = -1;
    if (firstSection.views < secondSection.views)
      compareVal = 1;
    if (compareVal === 0)
      compareVal = firstSection.videoId < secondSection.videoId ? -1 : 1;
    return compareVal;
  });
}

const checkResults = (topSections, offset) => (topSections?.length && (topSections?.length >= offset));

const filterSections = (sections, offset, size) => {
  var topSections = [];
  for (var section in sections) {
    topSections.push({ videoId: section, views: parseInt(sections[section]) });
  }
  topSections = arrangeSections(topSections);
  const fileredSections = checkResults(topSections, offset) ? topSections.slice(offset, (offset + size)) : topSections;
  return { 'total': topSections?.length, ids: fileredSections.map((video) => video.videoId) };
}

exports.getRecommendedVideos = async (sectionId, offset, size) => {
  let sections;
  try {
    sections = await recieveRecommendedVideos(sectionId);
  }
  catch (error) {
    console.log("Error in getting documents from DB :", sectionId, error);
    throw error;
  }
  return sections ? filterSections(sections, offset, size) : { 'total': 0, ids: [] };
}

