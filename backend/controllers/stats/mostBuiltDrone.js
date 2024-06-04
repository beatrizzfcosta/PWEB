const express = require("express");
const router = express.Router();
const Drone = require("../../models/drone/drone");

router.get("/", async (req, res) => {
  try {
    const mostBuiltDrone = await Drone.findOne().sort({ quantity: -1 }).exec();

    if (mostBuiltDrone) {
      res.status(200).json(mostBuiltDrone);
    } else {
      res.status(404).json({ message: "No drones found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
