const { pushNotificationToChannel } = require("./common-impl");
const forEach = require("lodash/forEach");

exports.iterateAndPush = (channels, reqBody) => {
  forEach(channels, function (channel) {
    // console.log("FOR DEBUGGING pushNotifications forEach:", channel);
    pushNotificationToChannel(channel, reqBody);
  });
};
