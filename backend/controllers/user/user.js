//user.js

const express = require("express");
const router = express.Router();

const createUserRoutes = require("./routes/post");
const deleteUserRoutes = require("./routes/delete");
const patchUserRoutes = require("./routes/patch");
const loginRoutes = require("./login/login");
const auth = require("../../middlewares/auth")

router.use("/login", loginRoutes);

router.use("/", /*auth,*/ createUserRoutes);
router.use("/", /*auth,*/ deleteUserRoutes);
router.use("/", /*auth,*/ patchUserRoutes);

module.exports = router;
