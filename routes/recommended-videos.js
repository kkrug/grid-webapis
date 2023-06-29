/**
 * @swagger
 * definitions: 
 *  RV_RQ:  
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
 *  RV_COMMON:  
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
 *  RV_COMMON_DATA:  
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
 *        example: 2
 *      ids: 
 *        type: string
 *        description: topic ids
 *        example: 
 *          - 1c6034f8-ef39-4941-9c0b-36eea4e8ebf5 
 *          - 00c3ca4b-ec61-40f3-9065-83d00a836c82
 *  RV_POST_RS:  
 *    allOf:
 *      - $ref: '#/definitions/RV_COMMON'
 *        properties:
 *          data:
 *            $ref: '#/definitions/RV_COMMON_DATA'
 *  RV_GET_RS:  
 *    allOf:
 *      - $ref: '#/definitions/PT_COMMON'   
 *        properties:
 *          data:
 *            $ref: '#/definitions/PT_RS'
*/
const express = require("express");

const {
  ctrlPostRecommendedVideos,
  ctrlGetRecommendedVideos
} = require("../controllers/recommended-videos");
const {
  validate,
} = require("../helpers/inputValidations");
const {GET_RECOMMENDED_VIDEOS_METHOD} = require('../helpers/constants');
const responseHandler = require("../helpers/responseHandler");

const router = express.Router();

/**
 * @swagger
 * /recommended-videos:
 *  post:
 *   tags: [Recommended Videos]
 *   parameters:
 *       - in: body
 *         name: recommended videos
 *         required: true
 *         description: The Recommended Videos
 *         schema: 
 *          $ref: '#definitions/RV_RQ'
 *   responses:
 *      '200':
 *        description: Successfully updated the recommended videos
 *        schema:
 *          $ref: '#definitions/RV_POST_RS'
 */
router.post("/", [ctrlPostRecommendedVideos], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

/**
 * @swagger
 * /recommended-videos:
 *  get:
 *   tags: [Recommended Videos]
 *   parameters:
 *    - in: query
 *      name: sectionId
 *      schema:
 *        type: string
 *        required: true
 *        example: infuence-trendS
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
 *        description: Successfully retrieved the recommended videos
 *        schema:
 *            $ref: '#definitions/RV_GET_RS'
 */
router.get("/", validate(GET_RECOMMENDED_VIDEOS_METHOD),ctrlGetRecommendedVideos, async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

module.exports = router;