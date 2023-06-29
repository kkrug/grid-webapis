/* istanbul ignore file */
const customErrors = require("../helpers/customErrors");
const { ADMIN_ERROR_MSG, EVENT_ADDED_SUCCESSFULLY, EVENT_REMOVED_SUCCESSFULLY} = require("../helpers/constants");

const {
  receiveAttendingEvents,
  addAttendingEvent,
  deleteAttendingEvent,
} = require("../models/attend-event");

  exports.attendEvent = async (uid, eventId) => {
    try {
        await addAttendingEvent(uid, eventId);
        return EVENT_ADDED_SUCCESSFULLY;
      }
    catch (error) {
      console.log("error :", error, error?.errors?.[0]?.message);
      throw customErrors.summitError(503, ADMIN_ERROR_MSG);
    }
  }

  exports.UnAttendEvent = async (uid, eventId) => {
    try {
        await deleteAttendingEvent(uid, eventId);
        return EVENT_REMOVED_SUCCESSFULLY;
      }
    catch (error) {
      console.log("error :", error, error?.errors?.[0]?.message);
      throw customErrors.summitError(503, ADMIN_ERROR_MSG);
    }
  }

  exports.getAttendingEvents = async (uid) => {
    let events;
    try {
      events = await receiveAttendingEvents(uid);
    }
    catch (error) {
      console.log("Error in getting documents from DB :", error);
      throw error;
    }
    return events;
  }
