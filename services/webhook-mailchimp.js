const customErrors = require("../helpers/customErrors");
const {
  ADMIN_ERROR_MSG,
  QUERY_LITERALS: { SELECT_FIELDS_MAILCHIMP_UNSUB },
  NEWSLETTER: {
    LIST_ID_TO_SID,
    TYPE: { UNSUBSCRIBE, SUBSCRIBE },
  },
} = require("../helpers/constants");

const size = require("lodash/size");
const isEqual = require("lodash/isEqual");
const isEmpty = require("lodash/isEmpty");

const {
  commitTransactions,
  usersCurSubsDynamicSel,
  deleteUserById,
  fetchUserByEmail,
  registerUser,
} = require("../models/newsletter-subs");

const {
  commitQuery,
  usersCurSubsDynamicSelQuery,
  deleteUserByIdQuery,
  fetchUserByEmailQuery,
  registerUserQuery,
} = require("../helpers/queries");

const {
  arrayToObjFormat,
  formatSubsriptionResult,
} = require("../helpers/common-utils");

const {
  delUsersSubscription,
  addUsersSubscriptionService,
  getAllSubscriptions,
} = require("./service-utils");

const getUsersCurrentSubscriptions = async (email) => {
  const result = await usersCurSubsDynamicSel(
    usersCurSubsDynamicSelQuery(SELECT_FIELDS_MAILCHIMP_UNSUB, email)
  );

  const uid = result?.rows?.[0]?.uid;
  const listIdSidMapArr = formatSubsriptionResult(result, LIST_ID_TO_SID);
  const listIdSidMap = arrayToObjFormat(listIdSidMapArr);

  console.log("FOR DEBUGGING - Uid: %s ,listIdSidMap: %s", uid, listIdSidMap);

  return { uid, listIdSidMap };
};

const checkDBConfig = (audienceIdMapping, list_id) => {
  if (
    audienceIdMapping[list_id] == null ||
    audienceIdMapping[list_id] == undefined
  ) {
    console.log(
      "FOR DEBUGGING - Error: Incoming Audience Id: %s is not configured in DB %s",
      list_id
    );
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
};

const externalUnsubscribe = async (uid, listIdSidMap, sid) => {
  let sidRet = await delUsersSubscription(uid, sid);

  if (size(listIdSidMap) == 1 && !(sidRet == null || sidRet == undefined)) {
    const resUid = await deleteUserById(deleteUserByIdQuery(uid));
    console.log("User with Id %s deleted from DB", resUid?.rows?.[0]?.id);
  }
};

const doSubscriptionExist = (sid) => {
  return sid != null && sid != undefined ? true : false;
};

const actionSubscribe = async (uid, listIdSidMap, list_id, sid) => {
  console.log(
    "FOR DEBUGGING: WEBHOOK actionSubscribe - %s, %s, %s, %s",
    uid,
    listIdSidMap,
    list_id,
    sid
  );
  //internal api - do nothing
  if (doSubscriptionExist(listIdSidMap[list_id])) {
    return;
  }
  //external action
  else {
    await addUsersSubscriptionService(uid, sid);
  }
};

const actionUnsubscribe = async (uid, listIdSidMap, list_id, sid) => {
  console.log(
    "FOR DEBUGGING: WEBHOOK actionUnsubscribe - %s, %s, %s, %s",
    uid,
    listIdSidMap,
    list_id,
    sid
  );

  //internal api - do nothing
  if (!doSubscriptionExist(listIdSidMap[list_id])) {
    return;
  }
  //external action
  else {
    await externalUnsubscribe(uid, listIdSidMap, sid);
  }
};

const newUserFlow = async (email, uid, sid, doNotShareOptOut) => {
  console.log(
    "FOR DEBUGGING: WEBHOOK New User Flow - %s, %s, %s, %s",
    email,
    uid,
    sid,
    doNotShareOptOut
  );
  //register User
  const regUserValues = [email, null, doNotShareOptOut];
  const resUserRes = await registerUser(registerUserQuery(), regUserValues);
  uid = resUserRes?.rows?.[0].id;

  //update PII
  await addUsersSubscriptionService(uid, sid);

  await commitTransactions(commitQuery());
};

const existingUserFlow = async (email, uid, type, list_id, sid) => {
  console.log(
    "FOR DEBUGGING: WEBHOOK existingUserFlow - %s, %s, %s, %s, %s",
    email,
    uid,
    type,
    list_id,
    sid
  );

  //get Subscriptions
  const { listIdSidMap } = await getUsersCurrentSubscriptions(email);

  // if (isEmpty(listIdSidMap)) {
  //   console.log(
  //     "FOR DEBUGGING - Error: User %s is present without any subscriptions",
  //     uid
  //   );
  //   throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  // }

  if (isEqual(SUBSCRIBE, type)) {
    await actionSubscribe(uid, listIdSidMap, list_id, sid);
  } else if (isEqual(UNSUBSCRIBE, type)) {
    await actionUnsubscribe(uid, listIdSidMap, list_id, sid);
  }
};

exports.postWebhookMailchimp = async (req) => {
  const {
    body: {
      type,
      data: { action, email, list_id },
    },
  } = req;

  try {
    console.log(
      "FOR DEBUGGING - Request Body Params - Type %s, Action: %s, Email: %s, List: %s",
      type,
      action,
      email,
      list_id
    );

    const { audienceIdMapping } = await getAllSubscriptions();

    //validation
    checkDBConfig(audienceIdMapping, list_id);

    const userRes = await fetchUserByEmail(fetchUserByEmailQuery(email));
    let uid = userRes?.rows?.[0]?.id;

    //new user - external action - safe if check
    if (
      (uid == null || uid == undefined || uid == "") &&
      isEqual(SUBSCRIBE, type)
    ) {
      await newUserFlow(email, uid, audienceIdMapping[list_id], false);
    }
    //existing user
    else {
      await existingUserFlow(
        email,
        uid,
        type,
        list_id,
        audienceIdMapping[list_id]
      );
    }

    await commitTransactions(commitQuery());
  } catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
};
