const axios = require('axios');
const isEmpty = require('lodash/isEmpty');
const sortBy = require('lodash/sortBy');
const customErrors = require("../helpers/customErrors");
const { ADMIN_ERROR_MSG, LIST_CREATED_SUCCESSFULLY, LIST_PRESENT, ITEM_ADDED_FAILURE, LIST_NOT_PRESENT, ITEM_ADDED_SUCCESSFULLY, ITEM_REMOVED_SUCCESSFULLY, LIST_DELETED_SUCCESSFULLY, IMG, EXISTS, SUB_TYPE } = require("../helpers/constants");
const { DUPLICATE } = require("../helpers/httpCodes");

const {
  receiveAllListItems,
  createMyList,
  deleteMyList,
  addItemToUsersList,
  receiveItemsForList,
  deleteItemFromUsersList,
  addItemToDBList,
  receiveItemsFromDBList,
  deleteItemFromDBList
} = require("../models/list");

const resizerURL = "https://thesummit-the-summit-prod.cdn.arcpublishing.com/resizer";

exports.createAList = async (uid, name) => {
  let res;
  try {
    res = await createMyList(uid, name);
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
  if (res === LIST_PRESENT) {
    throw customErrors.summitError(DUPLICATE, LIST_PRESENT);
  }
  return LIST_CREATED_SUCCESSFULLY;
}

exports.deleteAList = async (req) => {
  const { uid, body: { name } } = req;
  let res;
  try {
    res = await deleteMyList(uid, name);
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
  if (res === LIST_PRESENT) {
    throw customErrors.summitError(DUPLICATE, LIST_PRESENT);
  }
  return LIST_DELETED_SUCCESSFULLY;
}

const getResponse = (doc) => {
  const data = doc.data() || {};
  let res = { name: doc.id, items: [] };
  Object.keys(data).forEach(function (key) {
    [IMG, EXISTS].includes(key) ? (res[key] = data[key]) : res.items.push(data[key]);
  });
  res.items = sortBy(res.items, 'added_date');
  return res;
}

const getMockItem = () => {
  const id = "FRKM3DLDIFEA7FUAGAA2HJW7MQ"
  const sectionId = "information-disinformation";
  const title = "Adapting America’s China strategy in an age of competitive interdependence";
  const publish_date = "2021-06-07T12:49:01.916Z";
  const media_url = "https://mcdn.podbean.com/mf/web/xcrm83/Sample_2.mp3";
  const duration = 27;
  return { id, sectionId, title, publish_date, media_url, duration };
}

const getAudioItem = (data) => {
  const subtype = data?.subtype || "";
  const media_url = (SUB_TYPE.EVENTS === subtype ? data?.label?.event_video_url?.text : data?.label?.audio_url?.text) || "";
  const audioVideoUrlKey = SUB_TYPE.EVENTS === subtype ? "event_video_url" : "audio_url";
  const durationKey = SUB_TYPE.PODCAST === subtype ? "podcast_audio_duration" : (SUB_TYPE.EVENTS === subtype ? "event_duration" : "audio_duratioin");
  const duration = (SUB_TYPE.PODCAST === subtype ? data?.label?.podcast_audio_duration?.text : data?.label?.event_duration?.text) || "";
  const label = {
    [audioVideoUrlKey]: {
      "text": media_url
    },
    [durationKey]: {
      "text": duration
    }
  }
  return label;
}
const getItemToStore = (data) => {
  const id = data?._id;
  const taxonomy = data?.taxonomy;
  const title = data?.headlines?.basic || "";
  const publish_date = data?.publish_date || "";
  const display_date = data?.display_date || "";
  const subtype = data?.subtype || "";
  const resized_params = data?.promo_items?.basic?.resized_params || {};
  //duration is constant now, will be dynamic value once finalized
  const label = getAudioItem(data);
  const url = data?.promo_items?.basic?.url || "";
  const img = { resized_params, url, resizerURL };
  const website_url = data?.websites[`${process.env.WEBSITE}`]?.website_url || "";
  const type = (!isEmpty(label?.audio_url?.text) || !isEmpty(label?.event_video_url?.text))  ? "LISTEN" : "READ" ;
  return { id, taxonomy, title, publish_date, display_date, subtype, label, img, type, website_url };
}

const getAndProcessArcStory = async (id) => {
  try {
    const url = `${process.env.BASE_URL}${process.env.CONTENT_API_URL}?query={"_id":"${id}"}&_website=${process.env.WEBSITE}`;
    const response = await axios.get(url, {});
    const itemToStore = getItemToStore(response?.data);
    return itemToStore;
  } catch (err) {
    console.error('article not present with article id 1: ', id);
    throw customErrors.summitError(DUPLICATE, ITEM_ADDED_FAILURE);
  }
};

exports.addItem = async (req) => {
  const { uid, body: { item } } = req;

  const storeItem = await getAndProcessArcStory(item?.id);
  //below commented code will be removed once fields are finalized
  // const storeItem = (item?.type === "listen") ? getMockItem() : await getAndProcessArcStory(item?.id);
  // storeItem.type = (item?.type === "listen") ? "listen" : "read";
  storeItem.added_date = new Date().toISOString();

  let res;
  try {
    res = await addItemToDBList(uid, storeItem);
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
  return ITEM_ADDED_SUCCESSFULLY;
}

exports.getItems = async (req) => {
  const { uid } = req;
  let res;
  try {
    const doc = await receiveItemsFromDBList(uid);
    res = getResponse(doc);
  }
  catch (error) {
    console.log("Error in getting documents from DB :", error);
    throw error;
  }
  return res;
}

exports.deleteItem = async (req) => {
  const { uid, body: { item_id: itemId } } = req;
  try {
    await deleteItemFromDBList(uid, itemId);
    return ITEM_REMOVED_SUCCESSFULLY;
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
}

exports.addItemToAList = async (req) => {
  const { uid, body: { list_name: listName, item, img } } = req;
  item.img = img;
  item.added_date = new Date().toISOString();
  let res;
  try {
    res = await addItemToUsersList(uid, listName, item, img);
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
  if (res === LIST_NOT_PRESENT) {
    throw customErrors.summitError(DUPLICATE, LIST_NOT_PRESENT);
  }
  return ITEM_ADDED_SUCCESSFULLY;
}

exports.deleteItemFromList = async (req) => {
  const { uid, body: { list_name: listName, item_id: itemId } } = req;
  try {
    await deleteItemFromUsersList(uid, listName, itemId);
    return ITEM_REMOVED_SUCCESSFULLY;
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
}

exports.getAllListAndItems = async (req) => {
  const { uid } = req;
  let lists;
  try {
    const listCol = await receiveAllListItems(uid);
    lists = listCol.docs.map(doc => {
      return getResponse(doc);
    });
  }
  catch (error) {
    console.log("Error in getting documents from DB :", error);
    throw error;
  }
  return lists ? { total: lists.length, lists } : {};
}

exports.getItemsForList = async (req) => {
  const { uid, query: { list } } = req;
  let res;
  try {
    const doc = await receiveItemsForList(uid, list);
    res = getResponse(doc);
  }
  catch (error) {
    console.log("Error in getting documents from DB :", error);
    throw error;
  }
  return res;
}
