//post

const express = require("express");
const router = express.Router();
const Project = require("../../../models/project/project");

router.post("/", async (req, res) => {
  try {
    const { name, drone, users, finished } = req.body;
    const { user } = req; 

    if (!name || !drone || !users || !finished) {
      return res.status(400).json({
        status: "fail",
        message: "Name, drone, users, and finished status are required fields.",
      });
    }

    const newProject = await Project.create({
      name: name,
      drone: drone,
      users: users,
      finished: finished,
    });

    res.status(201).json({
      status: "success",
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error.",
    });
  }
});

module.exports = router;


