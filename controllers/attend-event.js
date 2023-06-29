/* istanbul ignore file */
const {
  getAttendingEvents,
  attendEvent,
  UnAttendEvent,
} = require("../services/attend-event");
const constants = require('../helpers/constants');
const {validateInputs} = require('../helpers/inputValidations');

exports.ctrlGetAttendingEvents = async (req, res, next) => {
  try {
    const { uid } = req;
    const resData = await getAttendingEvents(uid);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlAttendAnEvent = async (req, res, next) => {
  try {
    validateInputs(req);
    const { uid } = req;
    const { eventId } = req.body;
    const resData = await attendEvent(uid, eventId);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlUnAttendAnEvent = async (req, res, next) => {
  try {
    validateInputs(req);
    const { uid } = req;
    const { eventId } = req.body;
    const resData = await UnAttendEvent(uid, eventId);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};


