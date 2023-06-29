const axios = require("axios");

const customErrors = require("../helpers/customErrors");
const {
  ADMIN_ERROR_MSG,
  NEWS_LETTER_ERRORS,
  SUBSCRIBED,
  INTERNAL_SERVER_ERROR,
  OPTIN_MONSTER: { DEFAULT_ID },
} = require("../helpers/constants");

const includes = require("lodash/includes");
const invert = require("lodash/invert");

const {
  registerUser,
  addUsersSubscription,
  commitTransactions,
  fetchUserByEmail,
} = require("../models/newsletter-subs");

const {
  registerUserQuery,
  addUsersSubscriptionQuery,
  commitQuery,
  fetchUserByEmailQuery,
} = require("../helpers/queries");

const { getApiConfig } = require("../helpers/common-utils");

const {
  getAllSubscriptions,
  getExistingSubscriptionsWithUid,
} = require("./service-utils");

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

const addUserSubscription = async (listId, audienceIdMapping, uid) => {
  try {
    const result = await addUsersSubscription(addUsersSubscriptionQuery(), [
      uid,
      audienceIdMapping[listId],
    ]);
    console.log(
      "FOR Debugging - User Mapping added for user %s and subscription id %s",
      uid,
      result?.rows?.[0]?.subscription_id
    );
  } catch (error) {
    console.log("Error in adding user's subscription to DB :", error);
    throw error;
  }
};

const updatePII = async (listId, audienceIdMapping, uid) => {
  addUserSubscription(listId, audienceIdMapping, uid);
  await commitTransactions(commitQuery());
};

const existingUserFlow = async (email, uid, listId, audienceIdMapping) => {
  let { usersExistingSubs } = await getExistingSubscriptionsWithUid(email);

  const isOldSubscription = includes(usersExistingSubs, listId);

  if (!isOldSubscription) {
    await updatePII(listId, audienceIdMapping, uid);
  }
};

const newUserFlow = async (
  email,
  uid,
  listId,
  audienceIdMapping,
  doNotShareOptOut
) => {
  const regUserValues = [email, null, doNotShareOptOut];
  const resUserRes = await registerUser(registerUserQuery(), regUserValues);
  uid = resUserRes?.rows?.[0].id;

  await commitTransactions(commitQuery());

  await updatePII(listId, audienceIdMapping, uid);
};

const userFlow = async (email, listId, doNotShareOptOut) => {
  const { nameAudienceMapping, nameIdMapping, audienceIdMapping } =
    await getAllSubscriptions();

  const audienceNameMapping = invert(nameAudienceMapping);
  const subscription = audienceNameMapping[listId];

  const userRes = await fetchUserByEmail(fetchUserByEmailQuery(email));
  let uid = userRes?.rows?.[0]?.id;

  if (uid == null || uid == undefined || uid == "") {
    await newUserFlow(email, uid, listId, audienceIdMapping, doNotShareOptOut);
  } else {
    await existingUserFlow(email, uid, listId, audienceIdMapping);
  }
};

const pushNewsLetterData = async (reqBody, listId) => {
  try {
    const {
      lead: { email },
    } = reqBody;
    const doNotShareOptOut = false;

    const apiConfig = getApiConfig(email, SUBSCRIBED, listId);

    const response = await axios(apiConfig);
    const resData = { ...response?.data, resStatus: response?.data?.status };

    await userFlow(email, listId, doNotShareOptOut);

    return resData;
  } catch (err) {
    console.log("error", err);
    err = formatErrorResponse(err);
    const errRes = {
      resStatus: err?.response?.status || 500,
      error: err?.response?.data || err?.message || INTERNAL_SERVER_ERROR,
    };
  }
};

exports.postWebhookOptinmonster = async (req) => {
  const { body, params } = req;
  let listId = params["sid"];

  try {
    console.log(
      "FOR DEBUGGING - Req Body: %s and listId: %s ",
      JSON.stringify(body),
      listId
    );

    if (listId == null || listId == undefined || listId == "") {
      listId = DEFAULT_ID;
    }

    await pushNewsLetterData(body, listId);
  } catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
};
