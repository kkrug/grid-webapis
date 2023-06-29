const express = require("express");
const {
  ctrlGetFBAdminStats,
  ctrlGetBookmarkStats,
} = require("../controllers/admin-stats");
const responseHandler = require("../helpers/responseHandler");

const router = express.Router();

router.get("/auth", ctrlGetFBAdminStats, async (req, res) => {
  responseHandler.successWithData(res, res.data, res.message);
});

router.get("/bookmark", ctrlGetBookmarkStats, async (req, res) => {
  responseHandler.successWithData(res, res.data, res.message);
});

module.exports = router;
