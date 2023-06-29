const {
  processRecommendedVideos,
  getRecommendedVideos
} = require("../services/recommended-videos");
const constants = require('../helpers/constants');
const {validateInputs} = require('../helpers/inputValidations');

exports.ctrlPostRecommendedVideos = async (req, res, next) => {
  const { startDate = `${process.env.GA_DEFAULT_START_DATE}`,
    endDate = `${process.env.GA_DEFAULT_START_DATE}` } = req.body;

  try {
    const resMsg = await processRecommendedVideos(startDate, endDate);
    res.message = resMsg;
    res.data = { success: true };
    next();

  } catch (error) {
    next(error);
  }
};

exports.ctrlGetRecommendedVideos = async (req, res, next) => {
  try {
    validateInputs(req);
    const { sectionId, offset, size } = req.query;
    const resData = await getRecommendedVideos(sectionId, parseInt(offset), parseInt(size));
    res.data = resData;
    res.message = constants.SUCCESS;
    next();

  } catch (error) {
    console.log(error);
    next(error);
  }
};
