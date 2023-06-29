const { admin } = require("../helpers/firebase");

module.exports = async (req, res, next) => {
  try {
    console.log('FOR DEBUGGING: request : middleware - test : ', req.body, req.auth, req.url, req.uid, req.headers["authorization"]);
    const decodedToken = await admin
      .auth()
      .verifyIdToken(req.headers["authorization"]);
    req.uid = decodedToken.uid;
    next();
  } catch (err) {
    const error = new Error();
    error.name = "Unauthorized";
    error.message = "Invalid user token!";
    next(error);
  }
};
