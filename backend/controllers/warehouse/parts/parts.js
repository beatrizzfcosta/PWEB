//user.js

const express = require("express");
const router = express.Router();

const getPartRoute = require("./routes/get");
const deletePartRoute = require("./routes/delete");
const postPartRoute = require("./routes/post");
const patchPartRoute = require("./routes/patch");

//this route is for the purpose of acting not on a individual scale but on multiple or all
const allRoutes = require("./all/all");
const auth = require("../../../middlewares/auth");

router.use("/allRoutes", allRoutes);

router.use("/", auth, postPartRoute);
router.use("/", auth, deletePartRoute);
router.use("/", auth, patchPartRoute);
router.use("/", auth, getPartRoute);

module.exports = router;
