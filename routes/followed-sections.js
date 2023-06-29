/**
 * @swagger
 * definitions: 
 *     FS_UPD_RQ:
 *       type: object
 *       required:
 *        - follow_sections
 *        - unfollow_sections
 *       properties:
 *        follow_sections:
 *          type: array
 *          items:
 *            type: string
 *            description: The section to follow
 *            example: /Culture
 *        unfollow_sections:
 *          type: array
 *          items:
 *            type: string
 *            description: The section to unfollow
 *            example: /influence-trends
 *     FS_UPD_RS:  
 *      type: object
 *      properties:
 *       responseCode:
 *        type: integer
 *        description: Response Code
 *        example: 200
 *       status:
 *        type: boolean
 *        description: Status
 *        example: true
 *       message:
 *        type: string
 *        description: returned message
 *        example: success
 *     FS_GET_RS:  
 *      type: object
 *      properties:
 *       responseCode:
 *        type: integer
 *        description: Response Code
 *        example: 200
 *       status:
 *        type: boolean
 *        description: Status
 *        example: true
 *       message:
 *        type: string
 *        description: returned message
 *        example: success
 *       data:
 *        type: object
 *        properties:
 *          sectionIds:
 *            type: array
 *            items:
 *              type: string
 *              example: /Culture
 *     FS_HEADER:
 *      type: apiKey
 *      example: eyJhTg3MGI2NzgiLCJ0eXAiOiJKVQifQ
 *      format: uuid
 *      required: true
*/
const express = require("express");
const auth = require("../middlewares/auth");
const {
  ctrlGetAllFollowedSections,
  ctrlFollowUnFollowSection
} = require("../controllers/followed-sections");
const responseHandler = require("../helpers/responseHandler");
const { validate } = require("../helpers/inputValidations");
const { FOLLOW_UNFOLLOW_SECTION_METHOD } = require('../helpers/constants');

const router = express.Router();

/**
 * @swagger
 * /followed-sections:
 *  get:
 *   summary: Retrieve the sections followed by User
 *   tags: [Follow Sections]
 *   parameters:
 *       - in: header
 *         name: Authorization    
 *         description: The authorization header to access firebase api's
 *         schema: 
 *          $ref: '#definitions/FS_HEADER'
 *   responses:
 *      '200':
 *        description: Successfully retrieved the users followed sections
 *        schema:
 *            $ref: '#definitions/FS_GET_RS'
 */
router.get("/", [auth, ctrlGetAllFollowedSections], async (req, res) =>
  responseHandler.successWithData(res, res.data, "success")
);

/**
 * @swagger
 * /followed-sections:
 *  post:
 *   tags: [Follow Sections]
 *   summary: Add the section to the users followed list
 *   parameters:
 *       - in: header
 *         name: Authorization    
 *         description: The authorization header to access firebase api's
 *         schema: 
 *          $ref: '#definitions/FS_HEADER'
 *       - in: body
 *         name: follow_unfollow_sections
 *         required: true
 *         description: The sections to follow and unfollow
 *         schema: 
 *          $ref: '#definitions/FS_UPD_RQ'
 *   responses: 
 *      '200':
 *          description: Successfully updated the users followed sections
 *          schema:
 *            $ref: '#definitions/FS_UPD_RS'
 *   
 */
router.post("/", [validate(FOLLOW_UNFOLLOW_SECTION_METHOD), auth, ctrlFollowUnFollowSection], async (req, res) =>
  responseHandler.successWithData(res, res.data, "success")
);
module.exports = router;

