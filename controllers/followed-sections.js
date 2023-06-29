const {
  followUnFollowSections,
  getAllFollowedSections
} = require("../services/followed-sections");
const constants = require('../helpers/constants');
const {validateInputs} = require('../helpers/inputValidations');

exports.ctrlFollowUnFollowSection = async (req, res, next) => {
  try {
    validateInputs(req);
    const { uid } = req;
    const { follow_sections, unfollow_sections } = req.body;
    const resData = await followUnFollowSections(uid, follow_sections, unfollow_sections);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlGetAllFollowedSections = async (req, res, next) => {
  try {
    const { uid } = req;
    const resData = await getAllFollowedSections(uid);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
