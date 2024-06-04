const express = require("express");
const router = express.Router();

const activeProjects = require("./activeProjects");
const mostBuiltDrone = require("./mostBuiltDrone");
const mostOwnedParts = require("./mostOwnedParts");
const projectsDoneByMonth = require("./projectsDoneByMonth");
const auth = require("../../middlewares/auth");

router.use("/", auth, activeProjects);
router.use("/", auth, mostBuiltDrone);
router.use("/", auth, mostOwnedParts);
router.use("/", auth, projectsDoneByMonth);

module.exports = router;
