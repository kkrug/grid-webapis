const map = require("lodash/map");

const {
  arrayToObjFormat,
  formatSubsriptionResult,
} = require("../helpers/common-utils");

const {
  NEWSLETTER: { AUDIENCE_ID, ID, AUDIENCE_TO_ID },
} = require("../helpers/constants");

const {
  allSubscriptions,
  currentSubscriptionsWithUid,
  testEncryptInsert,
  testEncryptFetch,
  deleteUsersSubscription,
  addUsersSubscription,
} = require("../models/newsletter-subs");

const {
  allSubscriptionsQuery,
  currentSubscripitonsWithUidQuery,
  testEncryptFetchQuery,
  testEncryptInsertQuery,
  deleteUsersSubscriptionQuery,
  addUsersSubscriptionQuery,
} = require("../helpers/queries");

const getAllSubscriptions = async () => {
  const result = await allSubscriptions(allSubscriptionsQuery());

  const nameAudienceMap = formatSubsriptionResult(result, AUDIENCE_ID);
  const nameIdMap = formatSubsriptionResult(result, ID);
  const audienceIdMap = formatSubsriptionResult(result, AUDIENCE_TO_ID);

  console.log(
    "FOR DEBUGGING - nameAudienceMap : %s, nameIdMap: %s, audienceIdMap: %s ",
    JSON.stringify(nameAudienceMap),
    JSON.stringify(nameIdMap),
    JSON.stringify(audienceIdMap)
  );

  const nameAudienceMapFormatted = arrayToObjFormat(nameAudienceMap);
  const nameIdMapFormatted = arrayToObjFormat(nameIdMap);
  const audienceIdMapFormatted = arrayToObjFormat(audienceIdMap);

  return {
    nameAudienceMapping: nameAudienceMapFormatted,
    nameIdMapping: nameIdMapFormatted,
    audienceIdMapping: audienceIdMapFormatted,
  };
};

const getExistingSubscriptionsWithUid = async (email) => {

  console.log("FOR Debugging - getExistingSubscriptionsWithUid email:", email);

  const result = await currentSubscriptionsWithUid(
    currentSubscripitonsWithUidQuery(email)
  );
  const uid = result?.rows?.[0]?.uid;

  const existingSubscriptions = map(result?.rows, (item) => item.sname);
  const usersExistingSubs = map(result?.rows, (item) => item.saudienceid);

  console.log(
    "FOR DEBUGGING - Existing Subscriptions - Names: %s, AudienceIds: %s ",
    existingSubscriptions,
    usersExistingSubs
  );

  return { uid, existingSubscriptions, usersExistingSubs };
};

const testEncryptSave = async (email) => {
  const regTestRecordValues = [email.split(".")[0], email];
  const testRes = await testEncryptInsert(
    testEncryptInsertQuery(process.env.PG_SECRET_KEY),
    regTestRecordValues
  );
  let testId = testRes?.rows?.[0].id;
  console.log("FOR DEBUGGING - Id: ", testId);
};

const testEncryptGet = async (email) => {
  const testRes = await testEncryptFetch(
    testEncryptFetchQuery(process.env.PG_SECRET_KEY, email)
  );
  const testRow = testRes?.rows?.[0];
  console.log("id | name | email ");
  console.log("%s | %s | %s ", testRow?.id, testRow?.name, testRow?.email);
};

const delUsersSubscription = async (uid, sid) => {
  try {
    const result = await deleteUsersSubscription(
      deleteUsersSubscriptionQuery(uid, sid)
    );
    console.log(
      "FOR Debugging - User Mapping deleted for user %s and subscription id %s",
      uid,
      result?.rows?.[0].subscription_id
    );
    return result?.rows?.[0].subscription_id;
  } catch (error) {
    console.log("Error in deleting user's subscription to DB :", error);
    throw error;
  }
};

const addUsersSubscriptionService = async (uid, sid) => {
  try {
    const result = await addUsersSubscription(addUsersSubscriptionQuery(), [
      uid,
      sid,
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

module.exports = {
  getAllSubscriptions,
  getExistingSubscriptionsWithUid,
  delUsersSubscription,
  addUsersSubscriptionService,
};
