/**
 * @swagger
 * definitions: 
 *  AB_RQ:  
 *    type: object
 *    properties:
 *      item:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: article id
 *            example: U3TPJ6FDSJE2VKLBITWDHBYYU
 *          title:
 *            type: string
 *            example: Boeing Moved to Fix 777 Engine Covers Before Failures
 *          publish_date:
 *            type: boolean
 *            example: 2021-06-10T12:50:16.569Z
 *      img:
 *        type: object
 *        properties:
 *          url:
 *            type: string
 *            example: https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.thesummit/YOTGGXUS2ZGTHJB5GOR52WHZXI.jpg
 *          resized_params:
 *            type: object
 *            description: image resized params
 *          resizerURL:
 *            type: string
 *            example: https://corecomponents-the-prophet-prod.cdn.arcpublishing.com/resizer
 *  AB_DEL_RQ:  
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *        description: article id
 *        example: U3TPJ6FDSJE2VKLBITWDHBYYU
 *  AB_RS:
 *    type: object
 *    properties:
 *      [article_id]:
 *        type: object
 *        properties:
 *          id: 
 *            type: string
 *            description: article Id
 *            example: KFXCCCPKEBBDJOQNDJJAGTKOP4
 *          type:
 *            type: string
 *            description: artile type - listen or read
 *            example: LISTEN
 *          added_date:
 *              type: string
 *              description: Article Bookmarked Date
 *              example: 2021-08-16T08:43:37.028Z
 *          title:
 *              type: string
 *              description: Article Title
 *              example: America Is Getting Unvaccinated People All Wrong
 *          taxonomy:
 *              type: object
 *              description: Article Taxomony - section, tags, primary_site, primary_section, sites
 *          img:
 *              type: object
 *              description: Article image - resizerURL, url, resized_params
 *          publish_date:
 *              type: string
 *              description: Article Published Date
 *              example: 2021-08-11T11:14:23.830Z
 *          label:
 *              type: object
 *              description: Article label - audio_duratioin, audio_url etc
 *          website_url:
 *              type: string
 *              description: Article Url
 *              example: /information-disinformation/data-visualizations/article-details/KFXCCCPKEBBDJOQNDJJAGTKOP4/2021/07/22/america-is-getting-unvaccinated-people-all-wrong/
 *          subtype:
 *              type: string
 *              description: Article Subtype - standard, event, podcast etc
 *              example: standard
 *  AB_COMMON:  
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
 *  AB_COMMON_DATA:  
 *    type: object
 *    properties:
 *      data:
 *        type: string
 *        description: returned message
 *        example: Article Bookmarked Successfully
 *  AB_DEL_DATA:  
 *    type: object
 *    properties:
 *      data:
 *        type: string
 *        description: returned message
 *        example: Article Removed from Bookmarks Successfully
 *  AB_POST_RS:  
 *    allOf:
 *      - $ref: '#/definitions/AB_COMMON'
 *      - $ref: '#/definitions/AB_COMMON_DATA'
 *  AB_DEL_RS:  
 *    allOf:
 *      - $ref: '#/definitions/AB_COMMON'
 *      - $ref: '#/definitions/AB_DEL_DATA' 
 *  AB_GET_RS:  
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'   
 *        properties:
 *          data:
 *            $ref: '#/definitions/AB_RS'
 *  FS_HEADER:
 *    type: apiKey
 *    example: eyJhTg3MGI2NzgiLCJ0eXAiOiJKVQifQ
 *    format: uuid
 *    required: true
*/
const express = require("express");
const auth = require("../middlewares/auth");
const {
  ctrlGetBookMarkedArticles,
  ctrlUnBookmarkArticle,
  ctrlBookmarkArticle,
} = require("../controllers/articles-bookmark");
const responseHandler = require("../helpers/responseHandler");
const { validate } = require("../helpers/inputValidations");
const { BOOKMARK_ARTICLE_METHOD,UNBOOKMARK_ARTICLE_METHOD } = require('../helpers/constants');

const router = express.Router();

/**
 * @swagger
 * /article-bookmark:
 *  get:
 *   tags: [Article Bookmark]
 *   parameters:
 *       - in: header
 *         name: Authorization    
 *         description: The authorization header to access firebase api's
 *         schema: 
 *          $ref: '#definitions/FS_HEADER'
 *   responses:
 *      '200':
 *        description: Successfully retrieved the bookmarks
 *        schema:
 *            $ref: '#definitions/AB_GET_RS'
 */
router.get("/", [auth, ctrlGetBookMarkedArticles], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

/**
 * @swagger
 * /article-bookmark:
 *  post:
 *   tags: [Article Bookmark]
 *   parameters:
 *       - in: header
 *         name: Authorization    
 *         description: The authorization header to access firebase api's
 *         schema: 
 *          $ref: '#definitions/FS_HEADER'
 *       - in: body
 *         name: article bookmark
 *         required: true
 *         description: The article to be bookmarked
 *         schema: 
 *          $ref: '#definitions/AB_RQ'
 *   responses:
 *      '200':
 *        description: Successfully added the bookmark
 *        schema:
 *          $ref: '#definitions/AB_POST_RS'
 */
router.post("/", [validate(BOOKMARK_ARTICLE_METHOD), auth, ctrlBookmarkArticle], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

/**
 * @swagger
 * /article-bookmark:
 *  delete:
 *   tags: [Article Bookmark]
 *   parameters:
 *       - in: header
 *         name: Authorization    
 *         description: The authorization header to access firebase api's
 *         schema: 
 *          $ref: '#definitions/FS_HEADER'
 *       - in: body
 *         name: article bookmark
 *         required: true
 *         description: The article to be un-bookmarked or deleted
 *         schema: 
 *          $ref: '#definitions/AB_DEL_RQ'
 *   responses:
 *      '200':
 *        description: Successfully removed the bookmark
 *        schema:
 *          $ref: '#definitions/AB_DEL_RS'
 */
router.delete("/", [validate(UNBOOKMARK_ARTICLE_METHOD), auth, ctrlUnBookmarkArticle], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

module.exports = router;
