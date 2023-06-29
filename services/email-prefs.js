
const isEmpty = require('lodash/isEmpty');
const customErrors = require("../helpers/customErrors");
const { ADMIN_ERROR_MSG, EMAIL_PREFERENCES_CONFIG_UPDATED_SUCCESSFULLY, EMAIL_PREFS_NOT_AVAILABLE, USER_EMAIL_PREFERENCES_UPDATED_SUCCESSFULLY, FALSE_STR } = require("../helpers/constants");

const {
  addEmailPrefsConfig,
  receiveEmailPrefsConfig,
  updateUserEmailPrefs,
  receiveUsersEmailPrefs
} = require("../models/email-prefs");

exports.postEmailPrefsConfig = async (req) => {
  const { body: { email_prefs: emailPrefs } } = req;
  try {
    await addEmailPrefsConfig(emailPrefs);
    return EMAIL_PREFERENCES_CONFIG_UPDATED_SUCCESSFULLY;
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
}

exports.getEmailPrefsConfig = async () => {
  let emailPrefsConfig;
  try {
    emailPrefsConfig = await receiveEmailPrefsConfig();
  }
  catch (error) {
    console.log("Error in getting documents from DB :", error);
    throw error;
  }
  return emailPrefsConfig ? emailPrefsConfig : { msg: EMAIL_PREFS_NOT_AVAILABLE };
}

exports.postUsersEmailPrefs = async (req) => {
  let { uid, body: { id, status } } = req;
  status = (FALSE_STR == status) ? false : status;
  try {
    await updateUserEmailPrefs(uid, id, status);
    return USER_EMAIL_PREFERENCES_UPDATED_SUCCESSFULLY;
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
}

exports.getUsersEmailPrefs = async (req) => {
  const { uid } = req;
  let userEmailPrefs;
  try {
    userEmailPrefs = await receiveUsersEmailPrefs(uid);
  }
  catch (error) {
    console.log("Error in getting documents from DB :", error);
    throw error;
  }
  return isEmpty(userEmailPrefs) ? {"emailPrefs": []} : userEmailPrefs;
}