const express = require("express");
const router = express.Router();
const Project = require("../../models/project/project");

router.get("/activeProjectsCount", async (req, res) => {
  try {
    const activeProjects = await Project.find({ finished: false }).exec();
    const activeProjectsCount = activeProjects.length; 

    res.status(200).json({ count: activeProjectsCount });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
