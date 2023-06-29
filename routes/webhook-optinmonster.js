const express = require("express");
const responseHandler = require("../helpers/responseHandler");
const { WEBHOOK_OPTINMASTER_SUCCESS } = require('../helpers/constants');
const router = express.Router();

const {
  ctrlPostWebhookOptinmonster
} = require("../controllers/webhook-optinmonster");

router.post("/:sid", [ctrlPostWebhookOptinmonster], async (req, res) => {
  responseHandler.successWithData(res, WEBHOOK_OPTINMASTER_SUCCESS || {}, res?.data?.resStatus);
});

module.exports = router;