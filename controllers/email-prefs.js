const {
  postEmailPrefsConfig,
  getEmailPrefsConfig,
  postUsersEmailPrefs,
  getUsersEmailPrefs
} = require("../services/email-prefs");
const constants = require('../helpers/constants');
const { validateInputs } = require('../helpers/inputValidations');

exports.ctrlEmailPrefsConfig = async (req, res, next) => {
  try {
    validateInputs(req);
    const resData = await postEmailPrefsConfig(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlGetEmailPrefsConfig = async (req, res, next) => {
  try {
    const resData = await getEmailPrefsConfig();
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlUsersEmailPrefs = async (req, res, next) => {
  try {
    validateInputs(req);
    const resData = await postUsersEmailPrefs(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlGetUsersEmailPrefs = async (req, res, next) => {
  try {
    const resData = await getUsersEmailPrefs(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

