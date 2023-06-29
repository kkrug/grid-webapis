/**
 * @swagger
 * definitions: 
 *  EmlPrefsCfg_RQ:
 *    type: object
 *    properties:
 *      email_prefs:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *              description: Item Id
 *            title:
 *              type: string
 *              description: Item Title
 *            description:
 *              type: string
 *              description: Item Description
 *        example: 
 *          - id: the-daily-drop
 *            title: The Daily Drop
 *            description: Recieve emails when the Daily Drop is ready to ready each day..
 *          - id: following-topics
 *            title: Following Topics
 *            description: Featured stories that we think you’ll enjoy..
 *          - id: following-journalist
 *            title: Following Journalist
 *            description: Get notified when journalists you follow publish stories..
 *          - id: event-reminders
 *            title: Event Reminders
 *            description: Get updates and reminders about events you are attending...
 *          - id: polls
 *            title: Polls
 *            description: Get notified when polls results are ready and published..
 *  EmlUsrPost_RQ:  
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *        description: id of the email prefs item
 *        example: following-topics
 *      status:
 *        type: boolean
 *        description: status true or false for ON/OFF email prefs
 *        example: true
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
 *        example: Email Preferences Configuration Updated Successfully
 *  AC_COMMON_DATA_Usr:  
 *    type: object
 *    properties:
 *      data:
 *        type: string
 *        description: returned message
 *        example: Users email preferences updated successfully
 *  EmlPrefsUsr_COMMON_RS:  
 *    type: object
 *    properties:
 *      emailPrefs:
 *        type: array
 *        items: 
 *          type: string
 *          description: Users email prefs
 *          example: following-topics
 *  EmlPrefsCfg_POST_RS:  
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'
 *      - $ref: '#/definitions/AC_COMMON_DATA'
 *  EmlPrefsUsr_POST_RS:  
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'
 *      - $ref: '#/definitions/AC_COMMON_DATA_Usr'
 *  EmlPrefsCfg_GET_RS:  
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'   
 *        properties:  
 *          data:
 *            $ref: '#/definitions/EmlPrefsCfg_RQ'  
 *  EmlPrefsUsr_GET_RS:  
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'   
 *        properties:
 *          data:
 *            $ref: '#/definitions/EmlPrefsUsr_COMMON_RS'
 *  FS_HEADER:
 *    type: apiKey
 *    example: eyJhTg3MGI2NzgiLCJ0eXAiOiJKVQifQ
 *    format: uuid
 *    required: true
*/
const express = require("express");
const auth = require("../middlewares/auth");
const {
  ctrlGetEmailPrefsConfig,
  ctrlEmailPrefsConfig,
  ctrlUsersEmailPrefs,
  ctrlGetUsersEmailPrefs
} = require("../controllers/email-prefs");
const responseHandler = require("../helpers/responseHandler");
const { validate } = require("../helpers/inputValidations");
const { EMAIL_PREFS_CONFIG_METHOD, USERS_EMAIL_PREFS_METHOD } = require('../helpers/constants');

const router = express.Router();

/**
 * @swagger
 * /email-prefs/config/:
 *  get:
 *   tags: [Email Prefs]
 *   responses:
 *      '200':
 *        description: Successfully retrieved the configured email preferences
 *        schema:
 *          $ref: '#definitions/EmlPrefsCfg_GET_RS'
 */
router.get("/config", [ctrlGetEmailPrefsConfig], async (req, res) =>
  responseHandler.successWithData(res, res.data, "success")
);

/**
 * @swagger
 * /email-prefs/config:
 *  post:
 *   tags: [Email Prefs]
 *   parameters:
 *    - in: body
 *      name: email pref configs
 *      required: true
 *      description: The app email config params
 *      schema: 
 *        $ref: '#definitions/EmlPrefsCfg_RQ'
 *   responses:
 *      '200':
 *        description: Successfully updated the configured email preferences
 *        schema:
 *          $ref: '#definitions/EmlPrefsCfg_POST_RS'
 */
router.post("/config", [validate(EMAIL_PREFS_CONFIG_METHOD), ctrlEmailPrefsConfig], async (req, res) =>
  responseHandler.successWithData(res, res.data, "success")
);

/**
 * @swagger
 * /email-prefs:
 *  post:
 *   tags: [Email Prefs]
 *   parameters:
 *    - in: header
 *      name: Authorization    
 *      description: The authorization header to access firebase api's
 *      schema: 
 *        $ref: '#definitions/FS_HEADER'
 *    - in: body
 *      name: User Email Prefs
 *      required: true
 *      description: Email Pref item for a user
 *      schema: 
 *        $ref: '#definitions/EmlUsrPost_RQ'
 *   responses:
 *      '200':
 *        description: Successfully retrieved the user's email preferences
 *        schema:
 *          $ref: '#definitions/EmlPrefsUsr_POST_RS'
 */
router.post("/", [validate(USERS_EMAIL_PREFS_METHOD), auth, ctrlUsersEmailPrefs], async (req, res) =>
  responseHandler.successWithData(res, res.data, "success")
);

/**
 * @swagger
 * /email-prefs:
 *  get:
 *   tags: [Email Prefs]
 *   parameters:
 *    - in: header
 *      name: Authorization    
 *      description: The authorization header to access firebase api's
 *      schema: 
 *        $ref: '#definitions/FS_HEADER'
 *   responses:
 *      '200':
 *        description: Successfully updated the user's email preferences
 *        schema:
 *          $ref: '#definitions/EmlPrefsUsr_GET_RS'
 */
router.get("/", [auth, ctrlGetUsersEmailPrefs], async (req, res) =>
  responseHandler.successWithData(res, res.data, "success")
);

module.exports = router;
