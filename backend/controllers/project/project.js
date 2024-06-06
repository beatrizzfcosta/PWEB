const express = require("express");
const router = express.Router();

const postProjRoutes = require("./routes/post");
const deleteProjRoutes = require("./routes/delete");
const patchProjRoutes = require("./routes/patch");
const getProjRoutes = require("./routes/get");
const getNumberOfActiveProjects = require("./getNumberOfActiveProjects");
const auth = require("../../middlewares/auth")

router.use("/", auth, getNumberOfActiveProjects);

router.use("/", auth, postProjRoutes);
router.use("/", auth, deleteProjRoutes);
router.use("/", auth, patchProjRoutes);
router.use("/", auth, getProjRoutes);

module.exports = router;
