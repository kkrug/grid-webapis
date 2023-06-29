require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const morganBody = require("morgan-body");
const expressValidator = require("express-validator");
const errorHandler = require("./helpers/errorHandler");
const routesv1 = require("./routes");
const routesv2 = require("./routesv2");
const routesArc = require("./routes-arc");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morganBody(app);
app.disable("x-powered-by");

app.use(expressValidator());

app.use("/api/v1", routesv1);
app.use("/api/v2", routesv2);
app.use("/api", routesv1);
app.use("/arc/api", routesArc);

app.use(errorHandler);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "The-Summit API's",
      description: "The Summit API Information",
      contact: {
        name: "Kartik Agrawal",
      },
      servers: [`${process.env.APP_BASE_URL}`],
    },
  },
  apis: ["server.js", "routes/*.js", "routesv2/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
swaggerDocs.basePath = "/api";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * tags:
 *    name: Health
 *    description: App Health Check
 */
/**
 * @swagger
 * /:
 *  get:
 *    tags: [Health]
 *    description: Checks the app health
 *    responses:
 *      '200':
 *        description: App is running successfully
 */
app.get("/", (req, res) => {
  res.send("App is running successfully");
});

base64decode = (data) => {
  while (data.length % 4 !== 0) {
    data += "=";
  }
  data = data.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(data, "base64").toString("utf-8");
};

parseSignedRequest = (signedRequest, secret) => {
  var encoded_data = signedRequest.split(".", 2);
  // decode the data
  var sig = encoded_data[0];
  console.log("sig : ", sig);
  var json = base64decode(encoded_data[1]);
  var data = JSON.parse(json);
  console.log("data : ", JSON.stringify(data));
  if (!data.algorithm || data.algorithm.toUpperCase() != "HMAC-SHA256") {
    throw Error(
      "Unknown algorithm: " + data.algorithm + ". Expected HMAC-SHA256"
    );
  }
  var expected_sig = crypto
    .createHmac("sha256", secret)
    .update(encoded_data[1])
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace("=", "");
  if (sig !== expected_sig) {
    throw Error("Invalid signature: " + sig + ". Expected " + expected_sig);
  }
  return data;
};

const FB_SECRET_KEY = "7444696e5017a6cb01efcb17cbc2feaf"; //proc
app.post("/facebook/deletion", async (req, res) => {
  console.log("entered healthCheck 1");
  try {
    const signedRequest = req.body.signed_request;
    console.log("test signedRequest", JSON.stringify(signedRequest));
    const userObj = parseSignedRequest(signedRequest, FB_SECRET_KEY);
    //  const userRecord = await admin
    //    .auth()
    //    .getUser("YvlABzxv4qcaguRx2CEwBTrfs9l2");
    const userRecord = await admin.auth().getUser(userObj.user_id);
    console.log("entered healthCheck 2");
    // await admin.auth().deleteUser(userRecord.uid);
    console.log("entered healthCheck 3", userRecord.uid);
    //  data = { url: "#{ENV['APP_HOST_URL']}/deletion_status?id=del_#{user.id}", confirmation_code: "del_#{user.id}" }

    res.json({
      url: "https://api.illo.news/deletion_status/id=123",
      confirmation_code: "123",
    });
  } catch (e) {
    console.log("entered healthCheck error ", e);
    // console.log(e);
    res.status(400).json({
      message: "Bad Request",
    });
  }
});

app.listen(process.env.PORT || PORT, function () {
  console.log("Server is running on Port:", process.env.PORT || PORT);
});
