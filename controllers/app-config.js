const {
  postAppConfigs,
  getAppConfigs,
  getAppConfigsV2,
} = require("../services/app-config");
const constants = require("../helpers/constants");
const { validateInputs } = require("../helpers/inputValidations");
const bcryptjs = require("bcryptjs");
const customErrors = require("../helpers/customErrors");

exports.ctrlAddAppConfigs = async (req, res, next) => {
  try {
    validateInputs(req);
    const resData = await postAppConfigs(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlGetAppConfigs = async (req, res, next) => {
  try {
    const resData = await getAppConfigs();
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//TODO: App Versioning Changes
exports.ctrlGetAppConfigsV2 = async (req, res, next) => {
  try {
    const {
      headers: { appconfigkey },
    } = req;
    try {
      //Key is bcryped with salt 12
      const isValidKey = await bcryptjs.compare(
        `${process.env.APP_CONFIG_SECRET}`,
        appconfigkey
      );
      if (!isValidKey) {
        console.error("FOR DEBUGGING: Key not Mathced");
        throw customErrors.summitError(403, constants.ACCESS_FORBIDDEN);
      }
    } catch (error) {
      console.log("FOR DEBUGGING: Invalid or Missing Api key", error);
      throw customErrors.summitError(403, constants.ACCESS_FORBIDDEN);
    }
    const resData = await getAppConfigsV2(req.query);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
//new source code test
