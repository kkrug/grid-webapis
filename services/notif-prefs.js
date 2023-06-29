
const isEmpty = require('lodash/isEmpty');
const customErrors = require("../helpers/customErrors");
const { ADMIN_ERROR_MSG, NOTIF_PREFERENCES_CONFIG_UPDATED_SUCCESSFULLY, NOTIF_PREFS_NOT_AVAILABLE, USER_NOTIFICATION_PREFERENCES_UPDATED_SUCCESSFULLY, FALSE_STR } = require("../helpers/constants");

const {
  addNotifPrefsConfig,
  receiveNotifPrefsConfig,
  updateUserNotifPrefs,
  receiveUsersNotifPrefs
} = require("../models/notif-prefs");

exports.postNotifPrefsConfig = async (req) => {
  const { body: { notif_prefs: notifPrefs } } = req;
  try {
    await addNotifPrefsConfig(notifPrefs);
    return NOTIF_PREFERENCES_CONFIG_UPDATED_SUCCESSFULLY;
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
}

exports.getNotifPrefsConfig = async () => {
  let notifPrefsConfig;
  try {
    notifPrefsConfig = await receiveNotifPrefsConfig();
  }
  catch (error) {
    console.log("Error in getting documents from DB :", error);
    throw error;
  }
  return notifPrefsConfig ? notifPrefsConfig : { msg: NOTIF_PREFS_NOT_AVAILABLE };
}

exports.postUsersNotifPrefs = async (req) => {
  let { uid, body: { id, status } } = req;
  status = (FALSE_STR == status) ? false : status;
  try {
    await updateUserNotifPrefs(uid, id, status);
    return USER_NOTIFICATION_PREFERENCES_UPDATED_SUCCESSFULLY;
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
}

exports.getUsersNotifPrefs = async (req) => {
  const { uid } = req;
  let userNotifPrefs;
  try {
    userNotifPrefs = await receiveUsersNotifPrefs(uid);
  }
  catch (error) {
    console.log("Error in getting documents from DB :", error);
    throw error;
  }
  return isEmpty(userNotifPrefs) ? {"notifPrefs": []} : userNotifPrefs;
}