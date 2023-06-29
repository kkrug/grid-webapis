/**
 * @swagger
 * definitions: 
 *  L_AI_RQ:  
 *    type: object
 *    properties:
 *      item:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: Item id
 *            example: 2MHJRYP3PVC53ASRRFXTLVSDQU
 *  L_I_DEL_RQ:  
 *    type: object
 *    properties:
 *      item_id:
 *        type: string
 *        description: Item id
 *        example: 2MHJRYP3PVC53ASRRFXTLVSDQU
 *  L_GET_ALL_MAIN_RS:
 *    type: object
 *    properties:
 *      total:
 *        type: integer
 *        example: 1
 *      lists:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            name: 
 *              type: string
 *              description: list name
 *              example: bookmarks
 *            items:
 *              type: array
 *              description: list items
 *              example: []
 *            exists:
 *              type: boolean
 *              description: indicator for list existance
 *              example: true
 *            img:
 *              type: object
 *              description: image object - resizerURL, url, resized_params
 *              example: {}
 *  L_GET_ITEMS_MAIN_RS:
 *    type: object
 *    properties:
 *      name: 
 *        type: string
 *        description: list name
 *        example: bookmarks
 *      items:
 *        type: array
 *        items:
 *         type: object
 *         example: {}
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
 *  L_IA_COMMON_DATA:  
 *    type: object
 *    properties:
 *      data:
 *        type: string
 *        description: returned message
 *        example: item added Successfully
 *  LI_DEL_COMMON_DATA:  
 *    type: object
 *    properties:
 *      data:
 *        type: string
 *        description: returned message
 *        example: Item removed Successfully
 *  LI_DEL_RS:  
 *    allOf:
 *      - $ref: '#/definitions/L_COMMON'
 *      - $ref: '#/definitions/LI_DEL_COMMON_DATA'
 *  L_AI_POST_RS:  
 *    allOf:
 *      - $ref: '#/definitions/L_COMMON'
 *      - $ref: '#/definitions/L_IA_COMMON_DATA' 
 *  L_GET_ALL_RS:  
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'   
 *        properties:
 *          data:
 *            $ref: '#/definitions/L_GET_ALL_MAIN_RS'
 *  L_GET_ITEMS_RS:  
 *    allOf:
 *      - $ref: '#/definitions/AC_COMMON'   
 *        properties:
 *          data:
 *            $ref: '#/definitions/L_GET_ITEMS_MAIN_RS'
 *  FS_HEADER:
 *    type: apiKey
 *    example: eyJhTg3MGI2NzgiLCJ0eXAiOiJKVQifQ
 *    format: uuid
 *    required: true
*/
const express = require("express");
const auth = require("../middlewares/auth");
const {
  ctrlGetListWithItems,
  ctrlAddItemToList,
  ctrlCreateList,
  ctrlDeleteList,
  ctrlGetListItems,
  ctrlDeleteItemFromList
} = require("../controllers/list");
const responseHandler = require("../helpers/responseHandler");
const { validate } = require("../helpers/inputValidations");
const { CREATE_LIST_METHOD, ADD_ITEM_TO_LIST_METHOD, GET_LIST_ITEMS_METHOD, DELETE_ITEM_FROM_LIST_METHOD, DELETE_LIST_METHOD } = require('../helpers/constants');

const router = express.Router();

router.post("/", [validate(CREATE_LIST_METHOD), auth, ctrlCreateList], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

router.delete("/", [validate(DELETE_LIST_METHOD), auth, ctrlDeleteList], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

router.post("/item/deprecated", [validate(ADD_ITEM_TO_LIST_METHOD), auth, ctrlAddItemToList], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

/**
 * @swagger
 * /list/item:
 *  post:
 *   tags: [List]
 *   parameters:
 *       - in: header
 *         name: Authorization    
 *         description: The authorization header to access firebase api's
 *         schema: 
 *          $ref: '#definitions/FS_HEADER'
 *       - in: body
 *         name: Add an item to the list body
 *         required: true
 *         description: Add an item to the list
 *         schema: 
 *          $ref: '#definitions/L_AI_RQ'
 *   responses:
 *      '200':
 *        description: Successfully added the provided item to the default list or the provided list name
 *        schema:
 *            $ref: '#definitions/L_AI_POST_RS'
 */
router.post("/item", [validate(ADD_ITEM_TO_LIST_METHOD), auth, ctrlAddItemToList], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

/**
 * @swagger
 * /list/items/all:
 *  get:
 *   tags: [List]
 *   parameters:
 *       - in: header
 *         name: Authorization    
 *         description: The authorization header to access firebase api's
 *         schema: 
 *          $ref: '#definitions/FS_HEADER'
 *   responses:
 *      '200':
 *        description: Successfully retrieved all the items with the all the lists
 *        schema:
 *            $ref: '#definitions/L_GET_ALL_RS'
 */
router.get("/items/all", [auth, ctrlGetListWithItems], async (req, res) =>
{
  console.log('FOR DEBUGGING: request : ', req.body, req.auth, req.url);
  responseHandler.successWithData(res, res.data, res.message)
}
);

router.get("/items/deprecated/", [validate(GET_LIST_ITEMS_METHOD), auth, ctrlGetListItems], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

/**
 * @swagger
 * /list/items:
 *  get:
 *   tags: [List]
 *   parameters:
 *       - in: header
 *         name: Authorization    
 *         description: The authorization header to access firebase api's
 *         schema: 
 *          $ref: '#definitions/FS_HEADER'
 *   responses:
 *      '200':
 *        description: Successfully retrieved all the items with the all the lists
 *        schema:
 *            $ref: '#definitions/L_GET_ITEMS_RS'
 */
router.get("/items/", auth, ctrlGetListItems, async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

/**
 * @swagger
 * /list/item:
 *  delete:
 *   tags: [List]
 *   parameters:
 *       - in: header
 *         name: Authorization    
 *         description: The authorization header to access firebase api's
 *         schema: 
 *          $ref: '#definitions/FS_HEADER'
 *       - in: body
 *         name: Delete an item to the list body
 *         required: true
 *         description: Delete an item to the list
 *         schema: 
 *          $ref: '#definitions/L_I_DEL_RQ'
 *   responses:
 *      '200':
 *        description: Successfully removed the item from the default list or the list provided
 *        schema:
 *            $ref: '#definitions/LI_DEL_RS'
 */
router.delete("/item", [validate(DELETE_ITEM_FROM_LIST_METHOD), auth, ctrlDeleteItemFromList], async (req, res) =>
  responseHandler.successWithData(res, res.data, res.message)
);

module.exports = router;
