const express = require("express");
const router = express.Router();

const activeProjects = require("./activeProjects");
const mostBuiltDrone = require("./mostBuiltDrone");
const mostOwnedParts = require("./mostOwnedParts");
const projectsDoneByMonth = require("./projectsDoneByMonth");
const auth = require("../../middlewares/auth");

router.use("/activeProjects", auth, activeProjects);
router.use("/mostBuiltDrone", auth, mostBuiltDrone);
router.use("/mostOwnedParts", auth, mostOwnedParts);
router.use("/projectsDoneByMonth", auth, projectsDoneByMonth);

module.exports = router;
