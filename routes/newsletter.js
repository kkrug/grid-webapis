const express = require("express");
const responseHandler = require("../helpers/responseHandler");
const { NEWSLETTER_METHOD, NEWS_LETTER_SUCCESS } = require('../helpers/constants');
const { validate } = require("../helpers/inputValidations");
const router = express.Router();

const {
  ctrlPostNewsLetter
} = require("../controllers/newsletter");

/**
 * @swagger
 * /newsletter":
 *  post:
 *   tags: [News Letter]
 *   responses:
 *      '200':
 *        description: Successfully subscribed the provided email to the news letter
 */
router.post("/", [validate(NEWSLETTER_METHOD), ctrlPostNewsLetter], async (req, res) => {
  responseHandler.successWithData(res, NEWS_LETTER_SUCCESS || {}, res?.data?.resStatus);
});

module.exports = router;