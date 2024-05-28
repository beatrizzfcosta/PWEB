//patch part

const express = require("express");
const router = express.Router();
const Part = require("../../../../models/peca/peca");

router.get("/", async (req, res) => {
  try {

    ////DB///////////////////////////

    return res.json({
      status: "success",
      message: "Part patched",
    });
  } catch (error) {
    return res.json({
      status: "fail",
      message: "Internal server error.",
    });
  }
});

module.exports = router;