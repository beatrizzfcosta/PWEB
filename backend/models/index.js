const express = require("express");
const router = express.Router();

const user = require("./user/user");
const userVerification = require("./user/userVerification");

router.use("/", user);
router.use("/", userVerification);

module.exports = router;