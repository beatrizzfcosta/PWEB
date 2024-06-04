//delete part

const express = require("express");
const router = express.Router();
const Part = require("../../../../models/part/part");

router.delete("/", async (req, res) => {
  try {
    const name = req.body.name;

    await Part.deleteOne({ name: name })
      .then((result) => {
        if (result.deletedCount === 0)
          res.status(400).json({
            status: "fail",
            message: "The specified part does not exist.",
          });
        else
          res.json({
            status: "success",
            message: "Part deleted",
          });
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "fail",
      message: "Internal server error.",
    });
  }
});

module.exports = router;
