const isEqual = require("lodash/isEqual");

const { getFBAuthStats, getBookmarkStats } = require("../services/admin-stats");
const constants = require("../helpers/constants");

exports.ctrlGetBookmarkStats = async (req, res, next) => {
  try {
    if (isEqual("ON", process.env.API_ACTIVE_SWITCH)) {
      const resData = await getBookmarkStats();
      res.data = resData;
      res.message = constants.SUCCESS;
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlGetFBAdminStats = async (req, res, next) => {
  try {
    if (isEqual("ON", process.env.API_ACTIVE_SWITCH)) {
      const resData = await getFBAuthStats();
      res.data = resData;
      res.message = constants.SUCCESS;
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
