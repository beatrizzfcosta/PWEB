//post

const express = require("express");
const router = express.Router();
const Project = require("../../../models/project/project");
const User = require("../../../models/user/user");

router.post("/", async (req, res) => {
  try {
    const { name, drone, users, finished } = req.body;
    console.log(name +" ,"+ drone +" ,"+ users +" ,"+ finished)

    if (!name || !drone || !users ) {
      return res.status(400).json({
        status: "fail",
        message: "Name, drone, users, and finished status are required fields.",
      });
    }
    const droneIds = await Promise.all(drones.map(async (droneName) => {
      const drone = await Drone.findOne({ name: droneName }); // Find drone by name instead of model
      if (!drone) {
        throw new Error(`Drone '${droneName}' not found`);
      }
      return drone._id;
    }));
    const userIds = await Promise.all(users.map(async (userName) => {
      const user = await User.findOne({ username: userName });
      if (!user) {
        throw new Error(`Username '${userName}' not found`);

      }
      return user._id;
    }));
    const newProject = await Project.create({
      name: name,
      drone: drone,
      users: userIds,
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


