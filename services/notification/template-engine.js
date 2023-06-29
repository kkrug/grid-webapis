const {
  NOTIFICATION: { ARTICLE_ID },
} = require("../../helpers/constants");
const {
  CHANNEL_KEYS,
  CHANNELS_KEY_VAL_MAPPING,
} = require("../../helpers/constants");

exports.templateEngine = (channel, msgIn) => {
  let msgOut = "";

  switch (channel) {
    case CHANNELS_KEY_VAL_MAPPING[CHANNEL_KEYS.OUTBOUND_WIRES_KEY]: {
      const {
        story: { id },
      } = msgIn;
      msgOut = { [ARTICLE_ID]: id };
      return msgOut;
    }
    default: {
      return msgOut;
    }
  }
};
