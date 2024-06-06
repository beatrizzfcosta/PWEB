const express = require("express");
const router = express.Router();
const Project = require("../../models/project/project");

router.get("/", async (req, res) => {
  try {
    const activeProjects = await Project.find({ finished: false })
      .limit(10)
      .exec();

    res.status(200).json(activeProjects);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
