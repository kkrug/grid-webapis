const {
  getAllListAndItems,
  createAList,
  deleteAList,
  deleteItemFromList,
  addItem,
  getItems,
  deleteItem
} = require("../services/list");
const constants = require('../helpers/constants');
const { validateInputs } = require('../helpers/inputValidations');

exports.ctrlAddItemToList = async (req, res, next) => {
  try {
    validateInputs(req);
    const resData = await addItem(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlCreateList = async (req, res, next) => {
  try {
    validateInputs(req);
    const { uid, body: { name } } = req;
    const resData = await createAList(uid, name);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlDeleteList = async (req, res, next) => {
  try {
    validateInputs(req);
    const resData = await deleteAList(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlGetListWithItems = async (req, res, next) => {
  try {
    validateInputs(req);
    const resData = await getAllListAndItems(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlGetListItems = async (req, res, next) => {
  try {
    validateInputs(req);
    const resData = await getItems(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};


exports.ctrlDeleteItemFromList = async (req, res, next) => {
  try {
    validateInputs(req);
    const resData = await deleteItem(req);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};


