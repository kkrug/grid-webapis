const {
  postWebhookNotifications,
} = require("../services/notification/webhook-notification");
const constants = require("../helpers/constants");

exports.ctrlPostNotifications = async (req, res, next) => {
  try {
    // console.log("FOR DEBUGGING ctrlPostNotifications: Recieved event from Arc");
    await postWebhookNotifications(req, res, next);
    res.data = {};
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
