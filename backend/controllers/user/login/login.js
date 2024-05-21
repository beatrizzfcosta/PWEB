//login.js

const express = require("express");
const router = express.Router();

const loginRoutes = require("./routes/post");
const auth = require("../../middlewares/auth");

router.use("/", /*auth,*/ loginRoutes);

module.exports = router;
