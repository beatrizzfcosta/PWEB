//index.js

const express = require("express");
const router = express.Router();

const user = require("./user/user");
const warehouse = require("./warehouse/warehouse");
const project = require("./project/project");

router.use("/", user);
router.use("/", warehouse);
router.use("/", project);

module.exports = router;
