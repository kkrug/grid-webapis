/**
 * @swagger
 * definitions:
 *  USER_COMMON_RS:
 *    type: object
 *    properties:
 *      lists:
 *        type: object
 *        properties:
 *          bookmarks:
 *            type: object
 *            description: object of bookmarked items
 *            example: {}
 *      preferences:
 *        type: object
 *        properties:
 *          notification:
 *            type: object
 *            description: notification prefs object
 *            example: {}
 *      sections:
 *        type: object
 *        description: followed sections object
 *        example: []
 *  L_COMMON:
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
 *  USER_RS:
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'
 *        properties:
 *          data:
 *            $ref: '#/definitions/USER_COMMON_RS'
 *  FS_HEADER:
 *    type: apiKey
 *    example: eyJhTg3MGI2NzgiLCJ0eXAiOiJKVQifQ
 *    format: uuid
 *    required: true
 */
const express = require("express");
const auth = require("../middlewares/auth");
const { ctrlGetUser, ctrlDelUser } = require("../controllers/user");
const responseHandler = require("../helpers/responseHandler");

const router = express.Router();

/**
 * @swagger
 * /user:
 *  get:
 *   tags: [User]
 *   parameters:
 *       - in: header
 *         name: Authorization
 *         description: The authorization header to access firebase api's
 *         schema:
 *          $ref: '#definitions/FS_HEADER'
 *   responses:
 *      '200':
 *        description: Successfully retrieved the users data
 *        schema:
 *            $ref: '#definitions/USER_RS'
 */
router.get("/", [auth, ctrlGetUser], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

router.delete("/", [auth, ctrlDelUser], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

module.exports = router;
