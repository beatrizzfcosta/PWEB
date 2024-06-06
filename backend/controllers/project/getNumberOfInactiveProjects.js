const express = require("express");
const router = express.Router();
const Project = require("../../models/project/project");

router.get("/inactiveProjectsCount", async (req, res) => {
  try {
    const inactiveProjectsCount = await Project.countDocuments({
      finished: true,
    }).exec();

    res.status(200).json({ count: inactiveProjectsCount });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
