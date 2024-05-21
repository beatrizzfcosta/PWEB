const express = require("express");
const router = express.Router();

const createProjRoutes = require("./routes/post");
const deleteProjRoutes = require("./routes/delete");
const patchProjRoutes = require("./routes/patch");
const getProjRoutes = require("./routes/get");
//const auth = require("../../middlewares/auth")

router.use("/", createProjRoutes);
router.use("/", deleteProjRoutes);
router.use("/", patchProjRoutes);
router.use("/", getProjRoutes);

module.exports = router;
