/* istanbul ignore file */
const express = require("express");
const {
  ctrlGetEvents,
  ctrlPostEvents
} = require("../controllers/events");
const responseHandler = require("../helpers/responseHandler");
const { validate } = require("../helpers/inputValidations");
const { GET_EVENTS_METHOD } = require('../helpers/constants');

const router = express.Router();

/**
 * @swagger
 * /events":
 *  post:
 *   tags: [Events]
 *   responses:
 *      '200':
 *        description: Successfully updated the events in the ARC CMS
 */
router.post("/",ctrlPostEvents, async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

/**
 * @swagger
 * /events":
 *  get:
 *   tags: [Events]
 *   responses:
 *      '200':
 *        description: Successfully retrieved the events from the ARC CMS
 */
router.get("/", [validate(GET_EVENTS_METHOD), ctrlGetEvents], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

module.exports = router;
