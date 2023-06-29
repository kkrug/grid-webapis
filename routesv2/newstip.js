const express = require("express");
const { ctrlPostNewstip } = require("../controllers/newstip");
const responseHandler = require("../helpers/responseHandler");

const { validate } = require("../helpers/inputValidations");
const { NEWSTIP_METHOD } = require("../helpers/constants");

const router = express.Router();

router.post(
  "/",
  [validate(NEWSTIP_METHOD), ctrlPostNewstip],
  async (req, res) => {
    responseHandler.successWithData(res, res.data, res.message);
  }
);

module.exports = router;
