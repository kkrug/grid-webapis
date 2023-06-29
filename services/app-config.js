const customErrors = require("../helpers/customErrors");
const {
  ADMIN_ERROR_MSG,
  APP_CONFIG_UPDATED_SUCCESSFULLY,
  APP_CONFIG_NOT_AVAILABLE,
} = require("../helpers/constants");
const isEmpty = require("lodash/isEmpty");
const {
  addAppConfigs,
  receiveAppConfigs,
  receiveAppConfigsV2,
} = require("../models/app-config");

exports.postAppConfigs = async (req) => {
  const { body } = req;
  const config = { ...body };
  try {
    const currentConfig = (await receiveAppConfigs()) || {};
    Object.keys(config).forEach((key) => {
      if (!isEmpty(config[key])) {
        currentConfig[key] = config[key];
      }
    });
    await addAppConfigs(currentConfig);
    return APP_CONFIG_UPDATED_SUCCESSFULLY;
  } catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
};

exports.getAppConfigs = async () => {
  let appConfig;
  try {
    appConfig = await receiveAppConfigs();
  } catch (error) {
    console.log("Error in getting documents from DB :", error);
    throw error;
  }
  return appConfig ? appConfig : { msg: APP_CONFIG_NOT_AVAILABLE };
};

exports.getAppConfigsV2 = async (query) => {
  let configs;
  let appConfig;
  try {
    const { iosRelease, androidRelease } = query;

    configs = await receiveAppConfigsV2();

    appConfig = configs?.[0]?.data();
    const cacheConfig = configs?.[1]?.data();
    const dropCardsConfig = configs?.[2]?.data();
    const modalsConfig = configs?.[3]?.data();

    appConfig.cache = cacheConfig;
    appConfig.dropCards = dropCardsConfig;

    if (!isEmpty(iosRelease)) {
      appConfig.iosRelease = modalsConfig["iOSRelease"][iosRelease] || {};
    } else if (!isEmpty(androidRelease)) {
      appConfig.androidRelease =
        modalsConfig["androidRelease"][androidRelease] || {};
    }

    console.log("FOR DEBUGGING: appConfig: ", JSON.stringify(appConfig));
  } catch (error) {
    console.log("Error in getting documents from DB :", error);
    throw error;
  }
  return appConfig ? appConfig : { msg: APP_CONFIG_NOT_AVAILABLE };
};
