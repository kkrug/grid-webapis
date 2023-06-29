const express = require("express");

const { ctrlGetHomepage } = require("../controllers/homepage");

const responseHandler = require("../helpers/responseHandler");

const router = express.Router();

router.get("/", ctrlGetHomepage, async (req, res) =>
  responseHandler.successFusion(res, res.data)
);

module.exports = router;
