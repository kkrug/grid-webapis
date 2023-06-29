const { query, body, validationResult } = require("express-validator/check");
const customErrors = require("../helpers/customErrors");
const { BAD_REQUEST } = require("../helpers/httpCodes");
const constants = require("../helpers/constants");

exports.validateInputs = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw customErrors.summitError(
      BAD_REQUEST,
      errors?.array()?.[0]?.msg,
      10000
    );
  }
};

exports.validate = (method) => {
  switch (method) {
    case constants.GET_POPULAR_TOPICS_METHOD:
    case constants.GET_RECOMMENDED_VIDEOS_METHOD: {
      return [
        query(constants.SECTION_ID, constants.INVALID_INPUT).exists(),
        query(constants.OFFSET, constants.INVALID_INPUT).exists().isInt(),
        query(constants.SIZE, constants.INVALID_INPUT).exists().isInt(),
      ];
    }
    case constants.ATTEND_EVENT_METHOD:
    case constants.UNATTEND_EVENT_METHOD: {
      return [
        body(constants.EVENT_ID, constants.INVALID_INPUT).exists({
          checkFalsy: true,
        }),
      ];
    }
    case constants.FOLLOW_UNFOLLOW_SECTION_METHOD: {
      return [
        body(constants.FOLLOW_SECTIONS, constants.INVALID_INPUT).exists(),
        body(constants.UNFOLLOW_SECTIONS, constants.INVALID_INPUT).exists(),
      ];
    }
    case constants.CREATE_LIST_METHOD:
    case constants.DELETE_LIST_METHOD: {
      return [
        body(constants.NAME, constants.INVALID_INPUT).exists({
          checkFalsy: true,
        }),
      ];
    }
    case constants.ADD_ITEM_TO_LIST_METHOD: {
      return [
        //below code will be required when multiple list will be enabled
        // body(constants.LIST_NAME, constants.INVALID_INPUT).exists({ checkFalsy: true }),
        body(constants.ITEM, constants.INVALID_INPUT).exists({
          checkFalsy: true,
        }),
      ];
    }
    case constants.BOOKMARK_ARTICLE_METHOD: {
      return [
        body(constants.IMG, constants.INVALID_INPUT).exists({
          checkFalsy: true,
        }),
        body(constants.ITEM, constants.INVALID_INPUT).exists({
          checkFalsy: true,
        }),
      ];
    }
    case constants.UNBOOKMARK_ARTICLE_METHOD: {
      return [body(constants.ID, constants.INVALID_INPUT).exists()];
    }
    case constants.GET_LIST_ITEMS_METHOD: {
      return [
        query(constants.LIST, constants.INVALID_INPUT).exists({
          checkFalsy: true,
        }),
      ];
    }
    case constants.DELETE_ITEM_FROM_LIST_METHOD: {
      console.log("validation method");
      return [
        //below code will be required when multiple list will be enabled
        // body(constants.LIST_NAME, constants.INVALID_INPUT).exists({ checkFalsy: true }),
        body(constants.ITEM_ID, constants.INVALID_INPUT).exists({
          checkFalsy: true,
        }),
      ];
    }
    case constants.EMAIL_PREFS_CONFIG_METHOD: {
      return [
        body(constants.EMAIL_PREFS, constants.INVALID_INPUT).exists({
          checkFalsy: true,
        }),
      ];
    }
    case constants.NOTIF_PREFS_CONFIG_METHOD: {
      return [
        body(constants.NOTIF_PREFS, constants.INVALID_INPUT).exists({
          checkFalsy: true,
        }),
      ];
    }
    case constants.USERS_EMAIL_PREFS_METHOD:
    case constants.USERS_NOTIF_PREFS_METHOD: {
      return [
        body(constants.ID, constants.INVALID_INPUT).exists({
          checkFalsy: true,
        }),
        body(constants.STATUS, constants.INVALID_INPUT).exists().isBoolean(),
      ];
    }
    case constants.GET_EVENTS_METHOD: {
      return [
        query(constants.CONTENT_ALIAS, constants.INVALID_INPUT)
          .exists({ checkFalsy: true })
          .isIn(constants.EVENTS_COLLECTIONS),
        query(constants.FROM, constants.INVALID_INPUT).exists().isInt(),
        query(constants.SIZE, constants.INVALID_INPUT).exists().isInt(),
      ];
    }
    case constants.APP_CONFIG_METHOD: {
      return [
        body(constants.SUPPORT_EMAIL, constants.INVALID_INPUT).exists(),
        body(constants.DOMAIN, constants.INVALID_INPUT).exists(),
        body(constants.OFFLINE_MESSAGE, constants.INVALID_INPUT).exists(),
        body(constants.TERM_URL, constants.INVALID_INPUT).exists(),
        body(constants.PRIVACY_POLICY, constants.INVALID_INPUT).exists(),
      ];
    }
    case constants.NEWSLETTER_METHOD: {
      return [
        body(constants.EMAIL, constants.INVALID_INPUT).exists().isEmail(),
      ];
    }
    case constants.NEWSLETTERSUBS_METHOD: {
      return [
        body(constants.EMAIL, constants.INVALID_INPUT).exists().isEmail(),
      ];
    }
    case constants.NEWSTIP_METHOD: {
      return [
        body(
          `${constants.NEWSTIP.NEWSTIP}.${constants.NEWSTIP.DETAILS}`,
          constants.INVALID_INPUT
        ).exists(),
      ];
    }
  }
};
