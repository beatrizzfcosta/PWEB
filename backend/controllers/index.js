//index.js

const express = require("express");
const router = express.Router();

const user = require("./user/user");
const warehouse = require("./warehouse/warehouse");
const project = require("./project/project");

router.use("/user", user);
router.use("/warehouse", warehouse);
router.use("/project", project);

module.exports = router;
