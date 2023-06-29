const map = require("lodash/map");
const reduce = require("lodash/reduce");
const { isEqual } = require("lodash");

const config = require("config");

const {
  METHOD_PUT,
  MAILCHIMP,
  MAILCHIMP_API_KEY,
  MAILCHIMP_ENDPOINT,
  APPLICATION_JSON,
  NEWSLETTER: { AUDIENCE_ID, ID, LIST_ID_TO_SID, AUDIENCE_TO_ID },
} = require("../helpers/constants");

const arrayToObjFormat = (objArr) => {
  return reduce(objArr, (res, cur) => Object.assign(res, cur), {});
};

const formatSubsriptionResult = (result, param) => {
  return map(result?.rows, (item) => {
    if (isEqual(param, AUDIENCE_ID)) {
      return { [item.name]: item.audience_id };
    } else if (isEqual(param, ID)) {
      return { [item.name]: item.id };
    } else if (isEqual(param, LIST_ID_TO_SID)) {
      return { [item.list_id]: item.sid };
    } else if (isEqual(param, AUDIENCE_TO_ID)) {
      return { [item.audience_id]: item.id };
    } else {
      return {};
    }
  });
};

const getApiConfig = (email, status, listId) => {
  console.log(
    "FOR DEBUGGING: email %s , status %s , listId %s",
    email,
    status,
    listId
  );
  return {
    method: METHOD_PUT,
    url: `${config.get(
      MAILCHIMP_ENDPOINT
    )}/LISTS/${listId}/members/${email}?skip_merge_validation=true`,
    auth: {
      username: MAILCHIMP,
      password: process.env[MAILCHIMP_API_KEY],
    },
    headers: {
      CONTENT_TYPE: APPLICATION_JSON,
    },
    data: {
      email_address: email,
      status: status,
      update_existing: true,
    },
  };
};

module.exports = {
  arrayToObjFormat,
  formatSubsriptionResult,
  getApiConfig,
};
