const moment = require("moment");

const currentDateTime = moment();

const getCurrentDate = (format) => {
  const currentDate = currentDateTime.format(format);
  return currentDate;
};

const getCurrentTime = (format) => {
  const currentTime = currentDateTime.format(format);
  return currentTime;
};

module.exports = {
  getCurrentDate,
  getCurrentTime,
};
