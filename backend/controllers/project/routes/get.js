//get

const express = require("express");
const router = express.Router();
const Project = require("../../../models/project/project");

router.get("/", async (req, res) => {
  try {
    const name = req.query.name; 

    const result = await Project.findOne({ name: name });

    if (!result) {
      return res.status(400).json({
        status: "fail",
        message: "The specified project does not exist.",
      });
    } else {
      return res.json({
        status: "success",
        message: "Project found",
        data: result,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error.",
    });
  }
});

module.exports = router;
