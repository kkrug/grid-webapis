/**
 * @swagger
 * definitions: 
 *  NotifPrefsCfg_RQ:
 *    type: object
 *    properties:
 *      notif_prefs:
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
 *            description: Get notified when the Daily Drop is ready to ready each day.
 *          - id: following-topics
 *            title: Following Topics
 *            description: Get notified when their is a new story for the topics you follow.
 *          - id: following-journalist
 *            title: Following Journalist
 *            description: Get notified when journalists you follow publish stories.
 *          - id: event-reminders
 *            title: Event Reminders
 *            description: Get updates and reminders about events you are attending.
 *          - id: polls
 *            title: Polls
 *            description: Get notified when polls results are ready and published.
 *  NotifUsrPost_RQ:  
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *        description: id of the notif prefs item
 *        example: following-topics
 *      status:
 *        type: boolean
 *        description: status true or false for ON/OFF notif prefs
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
 *        example: Notification Preferences Configuration Updated Successfully
 *  AC_COMMON_DATA_Usr:  
 *    type: object
 *    properties:
 *      data:
 *        type: string
 *        description: returned message
 *        example: Users Notification preferences updated successfully
 *  NotifPrefsUsr_COMMON_RS:  
 *    type: object
 *    properties:
 *      notifPrefs:
 *        type: array
 *        items: 
 *          type: string
 *          description: Users Notif prefs
 *          example: following-topics
 *  NotifPrefsCfg_POST_RS:  
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'
 *      - $ref: '#/definitions/AC_COMMON_DATA'
 *  NotifPrefsUsr_POST_RS:  
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'
 *      - $ref: '#/definitions/AC_COMMON_DATA_Usr'
 *  NotifPrefsCfg_GET_RS:  
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'   
 *        properties:  
 *          data:
 *            $ref: '#/definitions/NotifPrefsCfg_RQ'  
 *  NotifPrefsUsr_GET_RS:  
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'   
 *        properties:
 *          data:
 *            $ref: '#/definitions/NotifPrefsUsr_COMMON_RS'
 *  FS_HEADER:
 *    type: apiKey
 *    example: eyJhTg3MGI2NzgiLCJ0eXAiOiJKVQifQ
 *    format: uuid
 *    required: true
*/
const express = require("express");
const auth = require("../middlewares/auth");
const {
  ctrlGetNotifPrefsConfig,
  ctrlNotifPrefsConfig,
  ctrlUsersNotifPrefs,
  ctrlGetUsersNotifPrefs
} = require("../controllers/notif-prefs");
const responseHandler = require("../helpers/responseHandler");
const { validate } = require("../helpers/inputValidations");
const { NOTIF_PREFS_CONFIG_METHOD, USERS_NOTIF_PREFS_METHOD } = require('../helpers/constants');

const router = express.Router();

/**
 * @swagger
 * /notif-prefs/config:
 *  post:
 *   tags: [Notification Prefs]
 *   parameters:
 *    - in: body
 *      name: notif pref configs
 *      required: true
 *      description: The app notif config params
 *      schema: 
 *        $ref: '#definitions/NotifPrefsCfg_RQ'
 *   responses:
 *      '200':
 *        description: Successfully updated the app notification preferenced
 *        schema:
 *          $ref: '#definitions/NotifPrefsCfg_POST_RS'
 */
router.post("/config", [validate(NOTIF_PREFS_CONFIG_METHOD), ctrlNotifPrefsConfig], async (req, res) =>
  responseHandler.successWithData(res, res.data, "success")
);

/**
 * @swagger
 * /notif-prefs/config:
 *  get:
 *   tags: [Notification Prefs]
 *   responses:
 *      '200':
 *        description: Successfully retrieved the app notification preferenced
 *        schema:
 *          $ref: '#definitions/NotifPrefsCfg_GET_RS'
 */
router.get("/config", [ctrlGetNotifPrefsConfig], async (req, res) =>
  responseHandler.successWithData(res, res.data, "success")
);

/**
 * @swagger
 * /notif-prefs:
 *  post:
 *   tags: [Notification Prefs]
 *   parameters:
 *    - in: header
 *      name: Authorization    
 *      description: The authorization header to access firebase api's
 *      schema: 
 *        $ref: '#definitions/FS_HEADER'
 *    - in: body
 *      name: User Notif Prefs
 *      required: true
 *      description: Notif Pref item for a user
 *      schema: 
 *        $ref: '#definitions/NotifUsrPost_RQ'
 *   responses:
 *      '200':
 *        description: Successfully updated the users notification preferenced
 *        schema:
 *          $ref: '#definitions/NotifPrefsUsr_POST_RS'
 */
router.post("/", [validate(USERS_NOTIF_PREFS_METHOD), auth, ctrlUsersNotifPrefs], async (req, res) =>
  responseHandler.successWithData(res, res.data, "success")
);

/**
 * @swagger
 * /notif-prefs:
 *  get:
 *   tags: [Notification Prefs]
 *   parameters:
 *    - in: header
 *      name: Authorization    
 *      description: The authorization header to access firebase api's
 *      schema: 
 *        $ref: '#definitions/FS_HEADER'
 *   responses:
 *      '200':
 *        description: Successfully retrieved the users notification preferenced
 *        schema:
 *          $ref: '#definitions/NotifPrefsUsr_GET_RS'
 */
router.get("/", [auth, ctrlGetUsersNotifPrefs], async (req, res) =>
  responseHandler.successWithData(res, res.data, "success")
);

module.exports = router;