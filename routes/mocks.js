const express = require("express");
const responseHandler = require("../helpers/responseHandler");
const fs = require('fs');
const router = express.Router();

/**
 * @swagger
 * /mock":
 *  get:
 *   tags: [Mocks]
 *   responses:
 *      '200':
 *        description: Successfully retrieved the mock with the name and value provided
 */
router.get("/:mockName", async (req, res) => {
  var mockName = req.params['mockName'];
  let mockDir = `${__dirname}/../mocks`;
  try
  {
  let podcastMock = fs.readFileSync(`${mockDir}/${mockName}.json`);
  res.data = JSON.parse(podcastMock);
  res.message = "success";
  }
  catch(err)
  {
    console.log(err);
  }
  responseHandler.successWithData(res, res.data, res.message);
}
);

/**
 * @swagger
 * /mock":
 *  post:
 *   tags: [Mocks]
 *   responses:
 *      '200':
 *        description: Successfully added the mock with the name and value provided
 */
router.post("/:mockName", async (req, res) => {
  const { data } = req.body;
  let mockName = req.params['mockName'];
  let mockDir = `${__dirname}/../mocks`;
  try
  {
  if (!fs.existsSync(mockDir)) {
    fs.mkdirSync(mockDir);
  }
  fs.writeFileSync(`${mockDir}/${mockName}.json`, JSON.stringify(data));
  res.message = `${mockName} Mock Posted Successfully`;
}
  catch(err)
  {
    console.log(err);
  }
  responseHandler.successWithData(res, res.data, res.message);
}
);

module.exports = router;
