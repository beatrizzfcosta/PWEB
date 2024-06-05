//user.js

const express = require("express");
const router = express.Router();

const postUserRoute = require("./routes/post");
const deleteUserRoute = require("./routes/delete");
const patchUserRoute = require("./routes/patch");
const getUserRoute = require("./routes/get");

const loginRoutes = require("./login/login");
const auth = require("../../middlewares/auth")

router.use("/login", loginRoutes);

router.use("/", postUserRoute);
router.use("/", auth, getUserRoute);
router.use("/", auth, deleteUserRoute);
router.use("/", auth, patchUserRoute);

module.exports = router;
