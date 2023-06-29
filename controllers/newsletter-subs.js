const {
  postNewsLetterSubs,
  postNewsLetterSubscription,
  postAddNewsletter,
  postDeleteNewsletter,
  postUpdateNewsletter,
  fetchAllSubscriptions,
  fetchUserSubscriptionsByEmail,
  fetchCategories,
  postDoNotShareFlag,
} = require("../services/newsletter-subs");
const { validateInputs } = require("../helpers/inputValidations");
const constants = require("../helpers/constants");

exports.ctrlPostNewsLetterSubs = async (req, res, next) => {
  try {
    validateInputs(req);
    await postNewsLetterSubs(req, res, next);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.ctrlPostNewsLetterSubscription = async (req, res, next) => {
  try {
    const resData = await postNewsLetterSubscription(req, res, next);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.ctrlPostAddNewsletter = async (req, res, next) => {
  try {
    const resData = await postAddNewsletter(req, res, next);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.ctrlPostDeleteNewsletter = async (req, res, next) => {
  try {
    const resData = await postDeleteNewsletter(req, res, next);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.ctrlPostUpdateNewsletter = async (req, res, next) => {
  try {
    const resData = await postUpdateNewsletter(req, res, next);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.ctrlGetAllSubscriptions = async (req, res, next) => {
  try {
    const resData = await fetchAllSubscriptions(req, res, next);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.ctrlGetUserSubscriptions = async (req, res, next) => {
  try {
    const resData = await fetchUserSubscriptionsByEmail(req, res, next);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.ctrlGetCategories = async (req, res, next) => {
  try {
    const resData = await fetchCategories(req, res, next);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.ctrlPostDoNotShareFlag = async (req, res, next) => {
  try {
    const resData = await postDoNotShareFlag(req, res, next);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};