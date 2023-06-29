const express = require("express");
const {
  ctrlPostNotifications,
} = require("../controllers/webhook-notification");
const responseHandler = require("../helpers/responseHandler");

const router = express.Router();

router.post("/", ctrlPostNotifications, async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

module.exports = router;
