const axios = require("axios");

const {
  NOTIFICATION: { ARTICLE_ID },
} = require("../../helpers/constants");

exports.outBoundWiresNotifImpl = async (reqBodyOut) => {
  if (`${process.env.NODE_ENV}` == "dev") {
    return;
  }
  const url = `${process.env.OW_PUB_AWS_BASE_URL}${process.env.OW_PUB_AWS_STAGE}/${process.env.OW_PUB_AWS_API}`;
  console.log("FOR DEBUGGING - Request To OutboundWires: ", reqBodyOut);
  
  axios
    .post(url, reqBodyOut, { headers: { "Content-Type": "application/json" } })
    .then((response) => {
      console.log("OUTBOUND_WIRES Response Recieved:", response?.data);
    })
    .catch((error) => {
      console.error(
        "API_ERROR_PUSH_NOTIFICATION: In Publishing OUTBOUND_WIRES: ",
        error
      );
    });
};

// Comment till template engine testing
/* exports.outBoundWiresNotifImpl = (reqBodyIn) => {
  if (`${process.env.NODE_ENV}` == "dev") {
    return;
  }
  const {
    story: { id },
  } = reqBodyIn;
  const reqBodyOut = { [ARTICLE_ID]: id };

  publishOutboundwires(reqBodyOut);
}; */
