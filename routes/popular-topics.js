/**
 * @swagger
 * definitions: 
 *  PT_RQ:  
 *    type: object
 *    properties:
 *      startDate:
 *        type: string
 *        description: Considered Start Date
 *        example: 15daysAgo
 *      endDate:
 *        type: string
 *        description: Considered End Date
 *        example: today
 *  PT_COMMON:  
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
 *        example: Job Completed Successfully
 *  PT_COMMON_DATA:  
 *    type: object
 *    properties:
 *      success: 
 *        type: boolean
 *        description: sucess true or false
 *        example: true
 *  PT_RS:  
 *    type: object
 *    properties:
 *      total:
 *        type: integer
 *        description: total no of topics
 *        example: 9
 *      ids: 
 *        type: string
 *        description: topic ids
 *        example: 
 *          - RZLJTN6WVZDNDP3GBEXSNB2UDY 
 *          - RZLJTN6WVZDNDP3GBEXSNB2UDY
 *  PT_POST_RS:  
 *    allOf:
 *      - $ref: '#/definitions/PT_COMMON'
 *        properties:
 *          data:
 *            $ref: '#/definitions/PT_COMMON_DATA'
 *  PT_GET_RS:  
 *    allOf:
 *      - $ref: '#/definitions/PT_COMMON'   
 *        properties:
 *          data:
 *            $ref: '#/definitions/PT_RS'
*/
const express = require("express");


const {
  ctrlPostPopularTopics,
  ctrlGetPopularTopics
} = require("../controllers/popular-topics");
const {
  validate,
} = require("../helpers/inputValidations");
const responseHandler = require("../helpers/responseHandler");

const router = express.Router();

/**
 * @swagger
 * /popularTopics:
 *  post:
 *   tags: [Popular Topics]
 *   parameters:
 *       - in: body
 *         name: popular topics
 *         required: true
 *         description: The Popular Topics
 *         schema: 
 *          $ref: '#definitions/PT_RQ'
 *   responses:
 *      '200':
 *        description: Successfully updated the popular topics
 *        schema:
 *          $ref: '#definitions/PT_POST_RS'
 */
router.post("/", [ctrlPostPopularTopics], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

/**
 * @swagger
 * /popularTopics:
 *  get:
 *   tags: [Popular Topics]
 *   parameters:
 *    - in: query
 *      name: sectionId
 *      schema:
 *        type: string
 *        required: true
 *        example: global-economy
 *    - in: query
 *      name: offset
 *      schema:
 *        type: integer
 *        required: true
 *        example: 0
 *    - in: query
 *      name: size
 *      schema:
 *        type: integer
 *        required: true
 *        example: 5
 *   responses:
 *      '200':
 *        description: Successfully retrieved the popular topics
 *        schema:
 *            $ref: '#definitions/PT_GET_RS'
 */
router.get("/", validate('ctrlGetPopularTopics'),ctrlGetPopularTopics, async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

module.exports = router;