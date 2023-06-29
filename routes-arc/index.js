const router = require("express").Router();
const homePageRoutes = require("./homepage");

router.use("/homepage", homePageRoutes);

module.exports = router;
