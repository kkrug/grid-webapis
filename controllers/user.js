const { getUser, delUser } = require("../services/user");
const constants = require("../helpers/constants");

exports.ctrlGetUser = async (req, res, next) => {
  try {
    const { uid } = req;
    const resData = await getUser(uid);
    res.data = resData || null;
    res.message = constants.SUCCESS;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.ctrlDelUser = async (req, res, next) => {
  try {
    const { uid } = req;
    const resData = await delUser(uid);
    res.data = constants.SUCCESS;
    res.message = resData || null;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
