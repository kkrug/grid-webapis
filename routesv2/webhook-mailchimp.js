const express = require("express");
const {
  ctrlPostWebhookMailchimp,
} = require("../controllers/webhook-mailchimp");
const responseHandler = require("../helpers/responseHandler");

const router = express.Router();

router.post("/", ctrlPostWebhookMailchimp, async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

router.get("/", async (req, res) =>
  responseHandler.success(res, "mailchimp unsubscribe webhook health")
);

module.exports = router;
