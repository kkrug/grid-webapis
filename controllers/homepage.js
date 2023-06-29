const { getHomepage } = require("../services/homepage");
const bcryptjs = require("bcryptjs");
const customErrors = require("../helpers/customErrors");
const constants = require("../helpers/constants");

exports.ctrlGetHomepage = async (req, res, next) => {
  try {
    const {
      headers: { apikey },
    } = req;

    try {
      //Key is bcryped with salt 12
      const isValidKey = await bcryptjs.compare(`${process.env.API_KEY}`, apikey);
      if (!isValidKey) {
        console.error("FOR DEBUGGING: Key not Mathced");
        throw customErrors.summitError(403, constants.ACCESS_FORBIDDEN);
      }
    } catch (error) {
      console.log("FOR DEBUGGING: Invalid or Missing Api key", error);
      throw customErrors.summitError(403, constants.ACCESS_FORBIDDEN);
    }

    const resData = await getHomepage();
    res.data = resData;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
