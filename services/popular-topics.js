
require('dotenv').config()

const atob = require("atob");
const fs = require('fs');
const axios = require('axios');
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
//     console.log('FOR DEBUGGING env Configs:', envConfig);
//   }
//   catch (err) {
//     console.log('error in s3, ebs confgurations: ', err);
//   }
// }
const GA_PRIVATE_KEY = gaPrivateKeyEnv ? gaPrivateKeyEnv : envConfig.GA_PRIVATE_KEY;
const authClient = null; 
//commenting below line - error in deploy
// const authClient = new google.auth.JWT(process.env.GA_CLIENT_EMAIL, null, atob(GA_PRIVATE_KEY), process.env.GA_SCOPES);
const ARTICLE_PATH = "/article-details/";

const {
  storePopularTopics,
  recievePopularTopics
} = require("../models/popular-topics");

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
          "filtersExpression": `ga:pagepath=@/${process.env.GA_STORY_PATH}/`,
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

const processTopics = async (sectionDetails) => {
  // console.log('FOR DEBUGGING: sectionDetails ', JSON.stringify(sectionDetails));
  for (const section in sectionDetails) {
    console.log(`FOR DEBUGGING: ${section} : ${JSON.stringify(sectionDetails[section])}`)

    await storePopularTopics(`${section}`, sectionDetails[section]);
  }
  return true;
}

const getSection = async (id) => {
  try {
    const url = `${process.env.BASE_URL}${process.env.CONTENT_API_URL}?query={"_id":"${id}"}&_website=${process.env.WEBSITE}`;
    const response = await axios.get(url, {});
    const websiteSection = response?.data?.websites[`${process.env.WEBSITE}`]?.website_section;

    return websiteSection?.parent_id == "/" ? websiteSection?._id?.slice(1) : websiteSection?.parent_id?.slice(1);
  } catch (err) {
    console.error('article not present with article id: ', id);
  }
};

const getArticle = async (websiteUrl) => {
  try {
    const url = `${process.env.BASE_URL}${process.env.CONTENT_API_URL}?query={"website_url":"${websiteUrl}"}&_website=${process.env.WEBSITE}`;
    const response = await axios.get(url, {});
    return response?.data?._id;
  } catch (err) {
    console.error('article not present with website url : ', websiteUrl);
  }
};

const mapSectionData = async (articleData) => {
  const sectionDetails = {};
  for (const article of articleData) {
    const sectionId = await getSection(article.articleId);
    if (sectionId) {
      if (sectionDetails[`${sectionId}`]) {
        sectionDetails[`${sectionId}`][`${article.articleId}`] = article.views;
      }
      else {
        sectionDetails[`${sectionId}`] = { [article.articleId]: article.views };
      }
    }
  }
  return processTopics(sectionDetails);
}

const getGAData = (startDate, endDate) => {
  return google.analyticsreporting('v4').reports.batchGet(getParams(startDate, endDate));
}

exports.processPopularTopics = async (startDate, endDate) => {
  try {
    const res = await getGAData(startDate, endDate);
    // console.log('FOR DEBUGGING: Analytics Data ', JSON.stringify(res?.data?.reports[0]?.data?.rows));
    if (res) {
      const metricsData = res?.data?.reports[0]?.data?.rows;
      const articleData = await Promise.all(metricsData?.map(async (metric) => {
        const url = metric?.dimensions[0];
        var articleId = await getArticle(url);
        // console.log('FOR DEBUGGING: Article Id ', articleId);
        //old code: commeted now. Will be removed later after stable release
        /* 
          var urlParts = url?.split("/");
          var articleId = urlParts?.pop();
          if (isEmpty(articleId)) {
          articleId = urlParts?.[urlParts?.length - 1];
        }
         const article_details_idx = url.indexOf(ARTICLE_PATH);
         const article_details_len = ARTICLE_PATH.length;
         const articleId = url?.slice(article_details_idx + article_details_len, url.indexOf('/', article_details_idx + article_details_len));
        */
        const views = metric?.metrics[0]?.values[0];
        return { articleId, views };
      }));
      // console.log('FOR DEBUGGING: articleData ', JSON.stringify(articleData));
      await mapSectionData(articleData);
      return JOB_SUCCESS_MSG;
    }
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
}

const arrangeTopics = (topTopics) => {
  return topTopics.sort((firstTopic, secondTopic) => {
    let compareVal = 0;
    if (firstTopic.views > secondTopic.views)
      compareVal = -1;
    if (firstTopic.views < secondTopic.views)
      compareVal = 1;
    if (compareVal === 0)
      compareVal = firstTopic.articleId < secondTopic.articleId ? -1 : 1;
    return compareVal;
  });
}

const checkResults = (topTopics, offset) => (topTopics?.length && (topTopics?.length >= offset)) ? true : false;

const filterTopics = (topics, offset, size) => {
  var topTopics = [];
  for (var topic in topics) {
    topTopics.push({ articleId: topic, views: parseInt(topics[topic]) });
  }
  topTopics = arrangeTopics(topTopics);
  const fileredTopics = checkResults(topTopics, offset) ? topTopics.slice(offset, (offset + size)) : topTopics;
  return { 'total': topTopics?.length, ids: fileredTopics.map((article) => article.articleId) };
}

exports.getPopularTopics = async (sectionId, offset, size) => {
  let topics;
  try {
    topics = await recievePopularTopics(sectionId);
  }
  catch (error) {
    console.log("Error in getting documents from DB :", sectionId, error);
    throw error;
  }
  return topics ? filterTopics(topics, offset, size) : [];
}
