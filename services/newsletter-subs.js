const axios = require("axios");

const map = require("lodash/map");
const forEach = require("lodash/forEach");
const reduce = require("lodash/reduce");
const difference = require("lodash/difference");

const {
  NEWS_LETTER_ERRORS,
  SUBSCRIBED,
  UNSUBSCRIBED,
  METHOD_PUT,
  MAILCHIMP,
  MAILCHIMP_API_KEY,
  MAILCHIMP_ENDPOINT,
  APPLICATION_JSON,
  INTERNAL_SERVER_ERROR,
  NEWS_LETTER_SUBSCRIPTION_ADDED_SUCCESSFULLY,
  ADMIN_ERROR_MSG,
  NEWSLETTER: {
    SUBSCRIPTION_ID_SEQ,
    SUBSCRIPTION_TABLE,
    USER_TYPE,
    AUDIENCE_ID,
    ID,
  },
} = require("../helpers/constants");
const config = require("config");
const customErrors = require("../helpers/customErrors");

const {
  getAllSubscriptions,
  getExistingSubscriptionsWithUid,
} = require("./service-utils");

const {
  testPGCon,
  registerUser,
  addSubscription,
  deleteSubscription,
  updateSubscription,
  currentSubscriptionsWithUid,
  allSubscriptions,
  addUsersSubscription,
  deleteUsersSubscription,
  commitTransactions,
  fetchUserByEmail,
  fetchCategories,
  setDoNotShareFlag,
} = require("../models/newsletter-subs");
const {
  registerUserQuery,
  addSubscriptionQuery,
  deleteSubscriptionQuery,
  updateSubscriptionQuery,
  currentSubscripitonsWithUidQuery,
  allSubscriptionsQuery,
  addUsersSubscriptionQuery,
  deleteUsersSubscriptionQuery,
  commitQuery,
  fetchUserByEmailQuery,
  fetchCategoriesQuery,
  setDoNotShareFlagQuery,
  setDoNotShareFlagByUidQuery,
} = require("../helpers/queries");
const { isEqual } = require("lodash");

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

const arrayToObjFormat = (objArr) => {
  return reduce(objArr, (res, cur) => Object.assign(res, cur), {});
};

const formatSubsriptionResult = (result, param) => {
  return map(result?.rows, (item) => {
    if (isEqual(param, AUDIENCE_ID)) {
      return { [item.name]: item.audience_id };
    } else if (isEqual(param, ID)) {
      return { [item.name]: item.id };
    } else {
      return {};
    }
  });
};

const addUsersSubscriptions = (newSubscripitons, uid, audienceIdMapping) => {
  forEach(newSubscripitons, async (newSub) => {
    console.log("FOR Debugging - new subscription is %s", newSub);
    try {
      const result = await addUsersSubscription(addUsersSubscriptionQuery(), [
        uid,
        audienceIdMapping[newSub],
      ]);
      console.log(
        "FOR Debugging - User Mapping added for user %s and subscription id %s",
        uid,
        result?.rows?.[0]?.subscription_id
      );
    } catch (error) {
      console.log(
        "API_ERROR_NEWSLETTER: Something went wrong in adding user's subscription to DB :",
        error
      );
      throw error;
    }
  });
};

const deleteUsersSubscriptions = (oldSubscriptions, uid, audienceIdMapping) => {
  forEach(oldSubscriptions, async (oldSub) => {
    try {
      const result = await deleteUsersSubscription(
        deleteUsersSubscriptionQuery(uid, audienceIdMapping[oldSub])
      );
      console.log(
        "FOR Debugging - User Mapping deleted for user %s and subscription id %s",
        uid,
        result?.rows?.[0].subscription_id
      );
    } catch (error) {
      console.log(
        "API_ERROR_NEWSLETTER: Something went wrong in deleting user's subscription to DB :",
        error
      );
      throw error;
    }
  });
};

const updatePII = async (
  userType,
  newSubscripitons,
  uid,
  audienceIdMapping,
  oldSubscriptions,
  doNotShareOptOut
) => {
  console.log(
    "FOR Debugging - updatePII %s, %s, %s, %s, %s %s",
    userType,
    newSubscripitons,
    uid,
    audienceIdMapping,
    oldSubscriptions,
    doNotShareOptOut
  );

  addUsersSubscriptions(newSubscripitons, uid, audienceIdMapping);

  if (isEqual(userType, USER_TYPE.EXISTING)) {
    deleteUsersSubscriptions(oldSubscriptions, uid, audienceIdMapping);
    setDoNotShareFlag(setDoNotShareFlagByUidQuery(uid, doNotShareOptOut));
  }
  await commitTransactions(commitQuery());
};

const iterateAndCallMailChimp = (subcriptionTypes, email, status) => {
  forEach(subcriptionTypes, function (sub) {
    const apiConfig = getApiConfig(email, status, sub);
    axios(apiConfig);
  });
};

const existingUserFlow = async (
  email,
  uid,
  subscriptions,
  audienceIdMapping,
  doNotShareOptOut
) => {
  console.log(
    "FOR Debugging - existingUserFlow %s, %s, %s, %s, %s",
    email,
    uid,
    subscriptions,
    audienceIdMapping,
    doNotShareOptOut
  );

  let { usersExistingSubs } = await getExistingSubscriptionsWithUid(email);

  //new subscriptions ie to be subscribed
  const newSubscripitons = difference(subscriptions, usersExistingSubs) || [];
  const oldSubscriptions = difference(usersExistingSubs, subscriptions) || [];

  await updatePII(
    USER_TYPE.EXISTING,
    newSubscripitons,
    uid,
    audienceIdMapping,
    oldSubscriptions,
    doNotShareOptOut
  );

  //call for mailchimp subscriptions for new subscriptions
  iterateAndCallMailChimp(newSubscripitons, email, SUBSCRIBED);

  //call for mailchimp un-subscriptions for old subscriptions
  iterateAndCallMailChimp(oldSubscriptions, email, UNSUBSCRIBED);
};

const newUserFlow = async (
  email,
  uid,
  subscriptions,
  audienceIdMapping,
  doNotShareOptOut
) => {
  console.log(
    "FOR Debugging - newUserFlow %s, %s, %s, %s, %s",
    email,
    uid,
    subscriptions,
    audienceIdMapping,
    doNotShareOptOut
  );

  const regUserValues = [email, null, doNotShareOptOut];
  const resUserRes = await registerUser(registerUserQuery(), regUserValues);
  uid = resUserRes?.rows?.[0].id;

  //update PII
  await updatePII(USER_TYPE.NEW, subscriptions, uid, audienceIdMapping);

  await commitTransactions(commitQuery());

  //call for mailchimp subscriptions for new subscriptions
  iterateAndCallMailChimp(subscriptions, email, SUBSCRIBED);
};

exports.postNewsLetterSubs = async (req, res, next) => {
  try {
    const { email, subscriptions = [] } = req.body;
    let { do_not_share_opt_out: doNotShareOptOut } = req.body;
    const { dnt } = req.headers;

    doNotShareOptOut = dnt == 1 ? true : false;

    console.log(
      "FOR DEBUGGING: user inputs - email %s, subsrciption %s and doNotShare %s, dnt %s",
      email,
      subscriptions,
      doNotShareOptOut,
      JSON.stringify(dnt)
    );

    const { audienceIdMapping } = await getAllSubscriptions();

    const userRes = await fetchUserByEmail(fetchUserByEmailQuery(email));
    let uid = userRes?.rows?.[0]?.id;

    if (uid == null || uid == undefined || uid == "") {
      //new User - register user
      await newUserFlow(
        email,
        uid,
        subscriptions,
        audienceIdMapping,
        doNotShareOptOut
      );
    } else {
      //existing user - get Subscriptions
      await existingUserFlow(
        email,
        uid,
        subscriptions,
        audienceIdMapping,
        doNotShareOptOut
      );
    }

    next();
  } catch (err) {
    console.error(
      "API_ERROR_NEWSLETTER: Something went wrong in publishing newsleeter"
    );
    err = formatErrorResponse(err);
    res.status(err?.response?.status || 500).send({
      error: err?.response?.data || err?.message || INTERNAL_SERVER_ERROR,
    });
  }
};

exports.postAddNewsletter = async (req, res, next) => {
  try {
    const {
      name,
      audience_id: audienceId,
      active = true,
      category_id,
      current_user,
    } = req.body;

    console.log(
      "FOR DEBUGGING - Inputs - name: %s, audience_id: %s, active: %s, category_id: %s, user: %s",
      name,
      audienceId,
      active,
      category_id,
      current_user
    );

    const subscriptionValues = [
      name,
      audienceId,
      active,
      category_id,
      current_user,
    ];
    await addSubscription(addSubscriptionQuery(), subscriptionValues);

    return "Newsletter added successfully.";
  } catch (error) {
    console.log("Error in adding subscription to DB :", error);
    throw error;
  }
};

exports.postDeleteNewsletter = async (req, res, next) => {
  try {
    const { id, current_user } = req.body;

    console.log("FOR DEBUGGING - Inputs - id: %s, user: %s", id, current_user);

    await deleteSubscription(deleteSubscriptionQuery(), [id, current_user]);

    return "Newsletter deleted successfully.";
  } catch (error) {
    console.log("Error in deleting subscription from DB :", error);
    throw error;
  }
};

exports.postUpdateNewsletter = async (req, res, next) => {
  try {
    const {
      id,
      name,
      audience_id: audienceId,
      category_id,
      current_user,
    } = req.body;

    console.log(
      "FOR DEBUGGING - Inputs - id: %s, name: %s, audience_id: %s, category_id: %s, user: %s",
      id,
      name,
      audienceId,
      category_id,
      current_user
    );

    const subscriptionValues = [
      id,
      name,
      audienceId,
      category_id,
      current_user,
    ];
    await updateSubscription(updateSubscriptionQuery(), subscriptionValues);

    return "Newsletter updated successfully.";
  } catch (error) {
    console.log("Error in updating subscription in DB :", error);
    throw error;
  }
};

exports.fetchAllSubscriptions = async () => {
  let subscriptions;
  try {
    const result = await allSubscriptions(allSubscriptionsQuery());
    subscriptions = map(
      result?.rows,
      ({ id, name, audience_id, category_name }) => ({
        id,
        name,
        audience_id,
        category_name,
      })
    );
  } catch (error) {
    console.log("Error in getting subscriptions from DB :", error);
    throw error;
  }
  return subscriptions;
};

exports.fetchUserSubscriptionsByEmail = async (req, res, next) => {
  let subscriptions, result;
  try {
    const { email: email } = req.body;
    result = await currentSubscriptionsWithUid(
      currentSubscripitonsWithUidQuery(email)
    );
    subscriptions = map(
      result?.rows,
      ({
        sname: name,
        saudienceid: audienceid,
        udonotshareoptout: donotshareoptout,
        uid,
      }) => ({
        name,
        audienceid,
        donotshareoptout,
        uid,
      })
    );
  } catch (error) {
    console.log("Error in getting user's subscriptions from DB :", error);
    throw error;
  }
  console.log(subscriptions);
  return subscriptions;
};

exports.fetchCategories = async () => {
  let categories;
  try {
    const result = await fetchCategories(fetchCategoriesQuery());
    categories = map(result?.rows, ({ id, name }) => ({
      id,
      name,
    }));
  } catch (error) {
    console.log("Error in getting categories from DB :", error);
    throw error;
  }
  return categories;
};

exports.postDoNotShareFlag = async (req, res, next) => {
  try {
    const { email, do_not_share_opt_out: doNotShareOptOut, sender: sender } = req.body;

    console.log(
      "FOR DEBUGGING - Inputs - email: %s, do_not_share_flag: %s, sender: %s",
      email,
      doNotShareOptOut,
      sender
    );

    await setDoNotShareFlag(setDoNotShareFlagQuery(email, doNotShareOptOut, sender));

    return "success";
  } catch (error) {
    console.log("Error in adding subscription to DB :", error);
    throw error;
  }
};
//dummy commit
