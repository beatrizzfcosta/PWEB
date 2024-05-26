const express = require("express");
const router = express.Router();

//patch
router.patch("/", (req, res) => {
  try {
    ///////////////////// DB code here /////////////////////

    return res.json({
      status: "success",
      message: "User information patched",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Failed to patch user information",
    });
  }
});

module.exports = router;
