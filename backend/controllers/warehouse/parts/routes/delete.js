//delete part

const express = require("express");
const router = express.Router();
const Part = require("../../../../models/peca/peca");

router.delete("/", async (req, res) => {
  try {
    const name = req.body.name;

    await Part.findOneAndDelete({ name: name });

    return res.json({
      status: "success",
      message: "Part deleted",
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