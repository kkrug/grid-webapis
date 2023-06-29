/**
 * @swagger
 * definitions:
 *  AC_UPD_RQ:
 *    type: object
 *    properties:
 *      support_email:
 *        type: string
 *        description: Support Email
 *        example: help@illo.news
 *      feedback_email:
 *        type: string
 *        description: Feedback Email
 *        example: help@illo.news
 *      offline_message:
 *        type: string
 *        description: Message to be shwon when user is offline
 *        example: Can’t connect to The Summit. If you are offline, please reconnect and try again.
 *      domain:
 *        type: string
 *        description: Domain
 *        example: thesummit-the-summit-sandbox.cdn.arcpublishing.com
 *      term_url:
 *        type: string
 *        description: Term Url
 *        example: https://www.freeprivacypolicy.com/live/c8de5847-710f-4c6f-953a-fa2e3943aa7a
 *      privacy_policy:
 *        type: string
 *        description: Privacy Policy Url
 *        example: https://www.freeprivacypolicy.com/live/c8de5847-710f-4c6f-953a-fa2e3943aa7a
 *      about_us:
 *        type: string
 *        description: About Us Url
 *        example: https://www.freeprivacypolicy.com/live/c8de5847-710f-4c6f-953a-fa2e3943aa7a
 *      forget_password_url:
 *        type: string
 *        description: Forget Password Page Url
 *        example: https://www.freeprivacypolicy.com/live/c8de5847-710f-4c6f-953a-fa2e3943aa7a
 *      resizerURL:
 *        type: string
 *        description: Image Resizer Url
 *        example: https://thesummit-the-summit-prod.cdn.arcpublishing.com/resizer
 *      latest_version:
 *        type: string
 *        description: Latest Version of the app
 *        example: 1.0"
 *      minimum_spported_version:
 *        type: string
 *        description: The minimum supported version of the app
 *        example: 1.0"
 *      website_url:
 *        type: string
 *        description: The Website Url
 *        example: https://thesummit-the-summit-sandbox.cdn.arcpublishing.com/
 *      site_id:
 *        type: string
 *        description: The Site Id
 *        example: the-summit
 *  AC_COMMON:
 *    type: object
 *    properties:
 *      responseCode:
 *        type: integer
 *        description: Response Code
 *        example: 200
 *      status:
 *        type: boolean
 *        description: Status
 *        example: true
 *      message:
 *        type: string
 *        description: returned message
 *        example: success
 *  AC_COMMON_DATA:
 *    type: object
 *    properties:
 *      data:
 *        type: string
 *        description: returned message
 *        example: App configurations updated Successfully
 *  AC_UPD_RS:
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'
 *      - $ref: '#/definitions/AC_COMMON_DATA'
 *  AC_GET_RS:
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'
 *        properties:
 *          data:
 *            $ref: '#/definitions/AC_UPD_RQ'
 */
const express = require("express");

const {
  ctrlGetAppConfigs,
  ctrlAddAppConfigs,
} = require("../controllers/app-config");
const responseHandler = require("../helpers/responseHandler");
const { validate } = require("../helpers/inputValidations");
const { APP_CONFIG_METHOD } = require("../helpers/constants");

const router = express.Router();

/**
 * @swagger
 * /app-config:
 *  get:
 *   tags: [App Config]
 *   url: /api/api-config
 *   responses:
 *      '200':
 *        description: Successfully retrieved the configs
 *        schema:
 *          $ref: '#definitions/AC_GET_RS'
 */
router.get("/", ctrlGetAppConfigs, async (req, res) =>
  responseHandler.successWithData(res, res.data, "success")
);

/**
 * @swagger
 * /app-config:
 *  post:
 *   tags: [App Config]
 *   summary: Updates the app confiugarations
 *   description: Use to post app configs
 *   parameters:
 *    - in: body
 *      name: app configs
 *      required: true
 *      description: The app config params
 *      schema:
 *        $ref: '#definitions/AC_UPD_RQ'
 *   responses:
 *      '200':
 *        schema:
 *          $ref: '#definitions/AC_UPD_RS'
 */
//disabling the post serice for app config
/*
  router.post("/", [validate(APP_CONFIG_METHOD), ctrlAddAppConfigs], async (req, res) =>
    responseHandler.successWithData(res, res.data, "success")
  );
*/
module.exports = router;
