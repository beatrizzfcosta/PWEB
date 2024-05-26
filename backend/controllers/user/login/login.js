//login.js

const express = require("express");
const router = express.Router();

const loginRoutes = require("./routes/post");

router.use("/", loginRoutes);

module.exports = router;
