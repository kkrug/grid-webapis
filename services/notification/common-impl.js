const { templateEngine } = require("./template-engine");

const { outBoundWiresNotifImpl } = require("./outbound-wires-notif-impl");
const { twitterNotifImpl } = require("./twitter-notif-impl");
const {
  CHANNEL_KEYS,
  CHANNELS_KEY_VAL_MAPPING,
} = require("../../helpers/constants");

const notifChannelConfig = {
  [CHANNELS_KEY_VAL_MAPPING[CHANNEL_KEYS.OUTBOUND_WIRES_KEY]]:
    outBoundWiresNotifImpl,
  [CHANNELS_KEY_VAL_MAPPING[CHANNEL_KEYS.TWITTER_KEY]]: twitterNotifImpl,
};

exports.pushNotificationToChannel = async (channel, reqBody) => {
  try {
    if (notifChannelConfig[channel]) {
      const msg = templateEngine(channel, reqBody);
      notifChannelConfig[channel](msg);
    } else {
      console.log(
        "API_ERROR_PUSH_NOTIFICATION: Channel not implemented yet: ",
        channel
      );
    }
    const resData = {};
    return resData;
  } catch (err) {
    console.error(
      "API_ERROR_PUSH_NOTIFICATION: Problem in sending notification to channel: ",
      channel
    );
    console.error("error: ", err);
    throw error;
  }
};
