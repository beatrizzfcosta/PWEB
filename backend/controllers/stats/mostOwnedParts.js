const express = require("express");
const router = express.Router();
const Part = require("../../models/part/part");

router.get("/", async (req, res) => {
  try {
    const mostStokedParts = await Part.find()
      .sort({ quantity: -1 })
      .limit(10)
      .exec();

    if (mostStokedParts) {
      res.status(200).json(mostStokedParts);
    } else {
      res.status(404).json({ message: "No parts found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
