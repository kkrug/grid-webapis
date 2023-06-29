/* istanbul ignore file */
const {
  getArcEvents,
  putArcEvents
} = require("../services/events");
const constants = require('../helpers/constants');
const { validateInputs } = require('../helpers/inputValidations');


exports.ctrlGetEvents = async (req, res, next) => {
  try {
    validateInputs(req);
    const resData = await getArcEvents(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};


exports.ctrlPostEvents = async (req, res, next) => {
  try {
    const resData = await putArcEvents(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};



