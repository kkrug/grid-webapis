const { postNewstip } = require("../services/newstip");
const constants = require("../helpers/constants");

const { validateInputs } = require("../helpers/inputValidations");

exports.ctrlPostNewstip = async (req, res, next) => {
  try {
    validateInputs(req);
    const {
      newstip: { details, name, email },
    } = req.body;
    // console.log("FOR DEBUGGING: ", details + " " + name + " " + email);
    const resData = await postNewstip(details, name, email);
    res.data = resData;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
