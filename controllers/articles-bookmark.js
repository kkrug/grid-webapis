const {
  getBookMarkedArticles,
  bookmarkAnArticle,
  UnBookmarkAnArticle,
} = require("../services/articles-bookmark");
const constants = require('../helpers/constants');
const { validateInputs } = require('../helpers/inputValidations');

exports.ctrlGetBookMarkedArticles = async (req, res, next) => {
  try {
    const { uid } = req;
    const resData = await getBookMarkedArticles(uid);
    res.data = resData || null;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlBookmarkArticle = async (req, res, next) => {
  try {
    validateInputs(req);
    const resData = await bookmarkAnArticle(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlUnBookmarkArticle = async (req, res, next) => {
  try {
    validateInputs(req);
    const resData = await UnBookmarkAnArticle(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};