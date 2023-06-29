const axios = require("axios");
const customErrors = require("../../helpers/customErrors");
const {
  ADMIN_ERROR_MSG,
  INTERNAL_SERVER_ERROR,
} = require("../../helpers/constants");

const { iterateAndPush } = require("./channel-iterator");

exports.postWebhookNotifications = async (req) => {
  const { body } = req;
  try {
    console.log("FOR DEBUGGING: postWebhookNotifications: ", body);
    var channels = process.env.NOTIFICATION_CHANNELS?.split(", ");
    // console.log("FOR DEBUGGING:", channels);
    iterateAndPush(channels, body);
  } catch (error) {
    console.log("error: ", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
};
