const {
  postNotifPrefsConfig,
  getNotifPrefsConfig,
  postUsersNotifPrefs,
  getUsersNotifPrefs
} = require("../services/notif-prefs");
const constants = require('../helpers/constants');
const { validateInputs } = require('../helpers/inputValidations');

exports.ctrlNotifPrefsConfig = async (req, res, next) => {
  try {
    validateInputs(req);
    const resData = await postNotifPrefsConfig(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlGetNotifPrefsConfig = async (req, res, next) => {
  try {
    const resData = await getNotifPrefsConfig();
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlUsersNotifPrefs = async (req, res, next) => {
  try {
    validateInputs(req);
    const resData = await postUsersNotifPrefs(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlGetUsersNotifPrefs = async (req, res, next) => {
  try {
    const resData = await getUsersNotifPrefs(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

