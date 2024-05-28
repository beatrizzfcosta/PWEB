//get part

const express = require("express");
const router = express.Router();
const Part = require("../../../../models/peca/peca");

router.get("/", async (req, res) => {
  try {
    const name = req.body.name;

    const part = await Part.findOne({ name: name });

    return res.json({
      status: "success",
      message: "Part something something",
      part: part,
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