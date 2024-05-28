//delete part

const express = require("express");
const router = express.Router();
const Part = require("../../../../models/peca/peca");

router.delete("/", async (req, res) => {
  try {
    const id = req.body.id;

    await Part.findOneAndDelete({ partId: id });

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