const { postWebhookMailchimp } = require("../services/webhook-mailchimp");
const constants = require("../helpers/constants");

exports.ctrlPostWebhookMailchimp = async (req, res, next) => {
  try {
    console.log("FOR DEBUGGING ctrlPostWebhookMailchimp: Recieved event from Maichimp");
    
    await postWebhookMailchimp(req, res, next);
    res.data = {};
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
