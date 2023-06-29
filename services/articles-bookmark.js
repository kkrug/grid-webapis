
const customErrors = require("../helpers/customErrors");
const { ADMIN_ERROR_MSG, ARTICLE_BOOKMARKED_SUCCESSFULLY, ARTICLE_UNBOOKMARKED_SUCCESSFULLY } = require("../helpers/constants");

const {
  receiveBookMarkedArticles,
  bookmarkArticle,
  deleteBookMarkedArticle,
} = require("../models/articles-bookmark");

exports.bookmarkAnArticle = async (req) => {
  const { uid, body: { item, img } } = req;
  item.img = img;
  try {
    await bookmarkArticle(uid, item, img);
    return ARTICLE_BOOKMARKED_SUCCESSFULLY;
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
}

exports.UnBookmarkAnArticle = async (req) => {
  const { uid, body: { id } } = req;
  try {
    await deleteBookMarkedArticle(uid, id);
    return ARTICLE_UNBOOKMARKED_SUCCESSFULLY;
  }
  catch (error) {
    console.log("error :", error, error?.errors?.[0]?.message);
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
}

exports.getBookMarkedArticles = async (uid) => {
  let articles;
  try {
    articles = await receiveBookMarkedArticles(uid);
  }
  catch (error) {
    console.log("Error in getting documents from DB :", error);
    throw error;
  }
  return articles;
}
