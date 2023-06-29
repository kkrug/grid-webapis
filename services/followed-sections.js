
const customErrors = require("../helpers/customErrors");
const { ADMIN_ERROR_MSG, FOLLOW_SECTION_UPDATED_SUCCESSFULLY} = require("../helpers/constants");

const {
  updateFollowedSections,
  receiveFollowedSections
} = require("../models/followed-sections");

  exports.followUnFollowSections = async (uid, follow_sections, unfollow_sections) => {
    try {
        await updateFollowedSections(uid, follow_sections, unfollow_sections);
        return FOLLOW_SECTION_UPDATED_SUCCESSFULLY;
      }
    catch (error) {
      console.log("error :", error, error?.errors?.[0]?.message);
      throw customErrors.summitError(503, ADMIN_ERROR_MSG);
    }
  }

  exports.getAllFollowedSections = async (uid) => {
    let sections;
    try {
      sections = await receiveFollowedSections(uid);
    }
    catch (error) {
      console.log("Error in getting documents from DB :", error);
      throw error;
    }
    return sections;
  }
