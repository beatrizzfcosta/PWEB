//user.js

const express = require("express");
const router = express.Router();

const postUserRoute = require("./routes/post");
const deleteUserRoute = require("./routes/delete");
const patchUserRoute = require("./routes/patch");

const loginRoutes = require("./login/login");
const auth = require("../../middlewares/auth")

router.use("/login", loginRoutes);

router.use("/", auth, postUserRoute);
router.use("/", auth, deleteUserRoute);
router.use("/", auth, patchUserRoute);

module.exports = router;
