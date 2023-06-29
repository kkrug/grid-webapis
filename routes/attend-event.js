/* istanbul ignore file */
const express = require("express");
const auth = require("../middlewares/auth");
const {
  ctrlGetAttendingEvents,
  ctrlUnAttendAnEvent,
  ctrlAttendAnEvent,
} = require("../controllers/attend-event");
const responseHandler = require("../helpers/responseHandler");
const { validate } = require("../helpers/inputValidations");
const { ATTEND_EVENT_METHOD,UNATTEND_EVENT_METHOD } = require('../helpers/constants');

const router = express.Router();

/**
 * @swagger
 * /event-attend":
 *  get:
 *   tags: [Event Attend]
 *   responses:
 *      '200':
 *        description: Successfully retrieved the user's attending event list
 */
router.get("/", [auth, ctrlGetAttendingEvents], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

/**
 * @swagger
 * /event-attend":
 *  post:
 *   tags: [Event Attend]
 *   responses:
 *      '200':
 *        description: Successfully added the event to attend list
 */
router.post("/", [validate(ATTEND_EVENT_METHOD), auth, ctrlAttendAnEvent], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

/**
 * @swagger
 * /event-attend":
 *  delete:
 *   tags: [Event Attend]
 *   responses:
 *      '200':
 *        description: Successfully removed the event to attend list
 */
router.delete("/", [validate(UNATTEND_EVENT_METHOD), auth, ctrlUnAttendAnEvent], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

module.exports = router;
