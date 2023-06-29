const {
  postWebhookOptinmonster,
} = require("../services/webhook-optinmonster");
const { validateInputs } = require('../helpers/inputValidations');

exports.ctrlPostWebhookOptinmonster = async (req, res, next) => {
  try {
    validateInputs(req);
    await postWebhookOptinmonster(req, res, next);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};


