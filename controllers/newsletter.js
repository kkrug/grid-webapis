const {
  postNewsLetter,
} = require("../services/newsletter");
const { validateInputs } = require('../helpers/inputValidations');

exports.ctrlPostNewsLetter = async (req, res, next) => {
  try {
    validateInputs(req);
    await postNewsLetter(req, res, next);
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};


