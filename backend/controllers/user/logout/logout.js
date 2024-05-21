//login.js

const express = require("express");
const router = express.Router();

const logoutRoutes = require("./routes/post");
const auth = require("../../middlewares/auth");

router.use("/", /*auth,*/ logoutRoutes);

module.exports = router;
