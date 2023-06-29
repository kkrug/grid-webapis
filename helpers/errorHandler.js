const {
  ADMIN_ERROR_MSG,
  USER_DELETE_ERR_MSG,
  ACCESS_FORBIDDEN,
} = require("./constants");
const httpCodes = require("./httpCodes");

module.exports = (err, req, res, next) => {
  const { message, code, name, error, httpStatus } = err;
  const status = false,
    data = null;

  if (
    error?.message === ADMIN_ERROR_MSG ||
    error?.message === USER_DELETE_ERR_MSG
  ) {
    return res.status(503).json({
      status,
      data,
      message: error?.message,
    });
  }

  if (error?.message === ACCESS_FORBIDDEN) {
    return res.status(403).json({
      status,
      data,
      message: error?.message,
    });
  }

  if (name === "Unauthorized") {
    return res.status(401).json({
      status,
      data,
      message,
    });
  }

  if (code === 10000) {
    return res.status(httpStatus).json({
      status,
      data,
      message: error?.message,
    });
  }

  if (code === 11000) {
    return res.status(422).json({
      status,
      data,
      message,
    });
  }

  if (httpStatus === httpCodes.DUPLICATE) {
    return res.status(httpStatus).json({
      status,
      data,
      message: error?.message,
    });
  }

  // default to 500 server error
  return res.status(500).json({
    message: "Internal server error.",
    status,
    data,
  });
};
