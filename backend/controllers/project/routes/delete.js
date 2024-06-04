//delete

const express = require("express");
const router = express.Router();
const Project = require("../../../models/project/project");

router.delete("/", async (req, res) => {
  try {
    const name = req.query.name; // Retrieve query parameter "name"

    const result = await Project.deleteOne({ name: name });

    if (result.deletedCount === 0) {
      return res.status(400).json({
        status: "fail",
        message: "The specified project does not exist.",
      });
    } else {
      return res.json({
        status: "success",
        message: "Project deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error.",
    });
  }
});

module.exports = router;

