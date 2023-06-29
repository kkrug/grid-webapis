const axios = require("axios");
const {
  NEWS_LETTER_ERRORS,
  SUBSCRIBED,
  METHOD_POST,
  METHOD_PUT,
  MAILCHIMP,
  MAILCHIMP_API_KEY,
  MAILCHIMP_ENDPOINT,
  MAILCHIMP_LISTID,
  APPLICATION_JSON,
  INTERNAL_SERVER_ERROR,
  LISTS,
  ADMIN_ERROR_MSG,
} = require("../helpers/constants");
const config = require("config");
const customErrors = require("../helpers/customErrors");

const formatErrorResponse = (err) => {
  const resTitle = err?.response?.data?.title;
  const title = NEWS_LETTER_ERRORS[`${resTitle}`].title || resTitle;
  const subtitle = NEWS_LETTER_ERRORS[`${resTitle}`].subtitle;
  return {
    ...err,
    response: {
      ...err.response,
      data: { ...err.response.data, title, subtitle },
    },
  };
};

const getExistingMember = async (email) => {
  const getApiConfig = {
    method: METHOD_PUT,
    url: `${config.get(MAILCHIMP_ENDPOINT)}/LISTS/${config.get(
      MAILCHIMP_LISTID
    )}/members/${email}`,
    auth: {
      username: MAILCHIMP,
      password: process.env[MAILCHIMP_API_KEY],
    },
  };
  let status;
  try {
    await axios(getApiConfig);
    status = true;
  } catch (err) {
    status = false;
  }
  return status;
};

exports.postNewsLetter = async (req, res, next) => {
  try {
    const {
      email,
      fname = "",
      lname = "",
      topics = [],
      occupation = [],
      postion = [],
      zipcode = "",
    } = req.body;
    const topicsStr = topics?.join(",") || "";
    const occupationStr = occupation?.join(",") || "";
    const postionStr = postion?.join(",") || "";

    const apiConfig = {
      method: METHOD_PUT,
      url: `${config.get(MAILCHIMP_ENDPOINT)}/LISTS/${config.get(
        MAILCHIMP_LISTID
      )}/members/${email}?skip_merge_validation=true`,
      auth: {
        username: MAILCHIMP,
        password: process.env[MAILCHIMP_API_KEY],
      },
      headers: {
        CONTENT_TYPE: APPLICATION_JSON,
      },
      data: {
        email_address: email,
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
          TOPICS: topicsStr,
          OCCUPATION: occupationStr,
          POSITION: postionStr,
          ZIPCODE: zipcode,
        },
        status: SUBSCRIBED,
        update_existing: true,
      },
    };
    const isExistingMember = await getExistingMember(email);
    if (isExistingMember) {
      error = customErrors.summitError(503, ADMIN_ERROR_MSG);
      error = { ...error, response: { data: { title: "Member Exists" } } };
      throw error;
    }
    const response = await axios(apiConfig);
    res.data = { ...response?.data, resStatus: response?.data?.status };
    next();
  } catch (err) {
    //Not logging error for now to minimize CloudWatch Alarms
    // console.log('FOR DEBUGGING : ERROR : NEWSLETTER : ', err);
    console.log("FOR DEBUGGING : NEWSLETTER");
    err = formatErrorResponse(err);
    res.status(err?.response?.status || 500).send({
      error: err?.response?.data || err?.message || INTERNAL_SERVER_ERROR,
    });
  }
};
