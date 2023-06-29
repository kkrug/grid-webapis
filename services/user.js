const customErrors = require("../helpers/customErrors");
const { receiveUser, deleteUsr } = require("../models/user");
const {
  USER_NOT_AVAILABLE,
  USER_DELETED_SUCCESSFULLY,
  USER_DELETE_ERR_MSG,
} = require("../helpers/constants");

exports.getUser = async (uid) => {
  let userData;
  try {
    userData = await receiveUser(uid);
  } catch (error) {
    console.log("Error in getting documents from DB :", error);
    throw error;
  }
  return userData ? userData : { msg: USER_NOT_AVAILABLE };
};

exports.delUser = async (uid) => {
  let userData;
  try {
    userData = await deleteUsr(uid);
  } catch (error) {
    console.log("Error in deleting user: ", error);
    throw customErrors.summitError(503, USER_DELETE_ERR_MSG);
  }
  return USER_DELETED_SUCCESSFULLY;
};
