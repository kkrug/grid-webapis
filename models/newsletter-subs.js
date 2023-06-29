const c = require("config");
const { openCon, closeCon, testCon } = require("../helpers/postgres");

exports.testPGCon = async () => {
  const client = await openCon();
  const result = await testCon(client);
  // console.log("FOR DEBUGGING: Test result from db: ", result);
  closeCon(client);
};

const executeQuery = async (query, values) => {
  let client = null;
  let result = null;
  try {
    client = await openCon();
    result = await client.query(query, values);
    // console.log("Test result from db: ", result);
  } catch (error) {
    console.log("Error while executing query: ", error);
    throw error;
  } finally {
    closeCon(client);
  }
  return result;
};

exports.registerUser = async (query, values) => {
  return await executeQuery(query, values);
};

exports.addSubscription = async (query, values) => {
  await executeQuery(query, values);
};

exports.deleteSubscription = async (query, values) => {
  await executeQuery(query, values);
};

exports.updateSubscription = async (query, values) => {
  await executeQuery(query, values);
};

exports.subscriptionCount = async (query) => {
  return await executeQuery(query);
};

exports.updateSequenceVal = async (query) => {
  return await executeQuery(query);
};

exports.currentSubscriptionsWithUid = async (query) => {
  return await executeQuery(query);
};

exports.allSubscriptions = async (query) => {
  return await executeQuery(query);
};

exports.addUsersSubscription = async (query, values) => {
  return await executeQuery(query, values);
};

exports.deleteUsersSubscription = async (query) => {
  return await executeQuery(query);
};

exports.commitTransactions = async (query) => {
  return await executeQuery(query);
};

exports.fetchUserByEmail = async (query) => {
  return await executeQuery(query);
};

exports.fetchCategories = async (query) => {
  return await executeQuery(query);
};

exports.testEncryptInsert = async (query, values) => {
  return await executeQuery(query, values);
};

exports.testEncryptFetch = async (query) => {
  return await executeQuery(query);
};

exports.setDoNotShareFlag = async (query) => {
  return await executeQuery(query);
};

exports.usersCurSubsDynamicSel = async (query) => {
  return await executeQuery(query);
};

exports.deleteUserById = async (query) => {
  return await executeQuery(query);
};
