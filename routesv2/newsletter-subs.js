const express = require("express");
const responseHandler = require("../helpers/responseHandler");
const {
  NEWSLETTERSUBS_METHOD,
  NEWS_LETTER_SUCCESS,
} = require("../helpers/constants");
const { validate } = require("../helpers/inputValidations");
const router = express.Router();

const {
  ctrlPostNewsLetterSubs,
  ctrlPostNewsLetterSubscription,
  ctrlGetAllSubscriptions,
  ctrlGetUserSubscriptions,
  ctrlGetCategories,
  ctrlPostDoNotShareFlag,
  ctrlPostAddNewsletter,
  ctrlPostDeleteNewsletter,
  ctrlPostUpdateNewsletter,
} = require("../controllers/newsletter-subs");

/**
 * @swagger
 * /newsletter":
 *  post:
 *   tags: [News Letter]
 *   responses:
 *      '200':
 *        description: Successfully subscribed the provided email to the news letter
 */
router.post(
  "/",
  [validate(NEWSLETTERSUBS_METHOD), ctrlPostNewsLetterSubs],
  async (req, res) => {
    responseHandler.successWithData(
      res,
      NEWS_LETTER_SUCCESS || {},
      res?.data?.resStatus
    );
  }
);

router.post(
  "/subscriptions",
  [ctrlPostNewsLetterSubscription],
  async (req, res) => {
    responseHandler.successWithData(res, res.data, res?.data?.resStatus);
  }
);

router.post(
  "/add-newsletter",
  [ctrlPostAddNewsletter],
  async (req, res) => {
    responseHandler.successWithData(res, res.data, res?.data?.resStatus);
  }
);

router.post(
  "/delete-newsletter",
  [ctrlPostDeleteNewsletter],
  async (req, res) => {
    responseHandler.successWithData(res, res.data, res?.data?.resStatus);
  }
);

router.post(
  "/update-newsletter",
  [ctrlPostUpdateNewsletter],
  async (req, res) => {
    responseHandler.successWithData(res, res.data, res?.data?.resStatus);
  }
);

router.get("/subscriptions", ctrlGetAllSubscriptions, async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

router.post("/user-subscriptions", ctrlGetUserSubscriptions, async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

router.get("/categories", ctrlGetCategories, async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

router.post(
  "/do-not-share",
  [ctrlPostDoNotShareFlag],
  async (req, res) => {
    responseHandler.successWithData(res, res.data, res?.data?.resStatus);
  }
);

module.exports = router;
