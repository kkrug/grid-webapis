/* istanbul ignore file */
const axios = require('axios');
const customErrors = require("../helpers/customErrors");
const { ADMIN_ERROR_MSG, EVENTS_COLLECTIONS, JOB_SUCCESS_MSG, JOB_FAILED_MSG, ITEM_ADDED_SUCCESSFULLY, ITEM_REMOVED_SUCCESSFULLY, LIST_DELETED_SUCCESSFULLY, IMG, EXISTS } = require("../helpers/constants");
const {
  storeEvents,
  recieveEvents
} = require("../models/events");
const FILTER = "{content_elements {_id label { event_date { text }}}";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const sortedData = (items) => items.sort((one, two) => new Date(two.date) - new Date(one.date));

const processData = (data) => {
  const items = data?.map(item => {
    const { _id, label: { event_date: { text: dateText } } } = item;
    // Current Date Format Used: Thursday, March 22, 2021 - 12:00 pm
    var dateArr = dateText.split(/\W+/);
    const date = new Date(dateArr[3], MONTHS.indexOf(dateArr[1]), dateArr[2], dateArr[4], dateArr[5]);
    return { _id, date };
  });
  const sortedRes = sortedData(items);
  //console.log('FOR DEBUGGING :', sortedRes);
  const storeData = { 'ids': [] };
  sortedRes?.forEach(storeItem => {
    storeData.ids.push(storeItem._id);
  });
  return storeData;
}

const checkResults = (sortedEvents, offset) => (sortedEvents?.length && (sortedEvents?.length >= offset));

const filterEventIds = (ids, offset, size) => checkResults(ids, offset) ? ids.slice(offset, (offset + size)) : [];

const getStoriesByIds = async (ids) => {
  let response = {};
  const url = `${process.env.BASE_URL}${process.env.CONTENT_FETCH}${process.env.CONTENT_STORIES_BY_IDS}?query={"ids":"${ids.join(",")}"}&_website=${process.env.WEBSITE}`;
  try {
    response = await axios.get(url, {});
    return response?.data || {};
  } catch (err) {
    console.error('Error while receiving docs from Arc', err);
    throw err;
  }
};

exports.getArcEvents = async (req) => {
  const { query: { content_alias: contentAlias, from: offset, size } } = req;
  let events;
  try {
    events = await recieveEvents(contentAlias);
  }
  catch (error) {
    console.log("Error in getting documents from DB :", error);
    throw error;
  }
  const filteredIds = filterEventIds(events?.ids || [], parseInt(offset), parseInt(size));
  return getStoriesByIds(filteredIds);
}

const executeJob = async (contentAlias) => {
  let from = 0, size = 20;
  let data = [];
  try {
    do {
      const url = `${process.env.BASE_URL}${process.env.CONTENT_FETCH}${process.env.CONTENT_API_COLLECTIONS}?query={"_id":"","from":"${from}","size":"${size}","content_alias":"${contentAlias}"}&_website=${process.env.WEBSITE}&filter=${FILTER}`;
      response = await axios.get(url, {});
      from += size;
      data = [...data, ...response?.data?.content_elements];
    }
    while (response?.data?.content_elements?.length);
    const sortedRes = processData(data);
    await storeEvents(contentAlias, sortedRes);
    // console.log('FOR DEBUGGINE: Content_ALias and Sorted Response : ', contentAlias, sortedRes);
    return true;
  } catch (err) {
    console.error('Errooo while receiving docs from Arc');
    throw err;
  }
};

exports.putArcEvents = async (req) => {
  for (const contentAlias of EVENTS_COLLECTIONS) {
    await executeJob(contentAlias);
  }
  return JOB_SUCCESS_MSG;
};