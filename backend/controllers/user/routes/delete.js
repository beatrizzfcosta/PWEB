const express = require("express");
const router = express.Router();
const User = require("../../../models/user/user");

//delete
router.delete("/", async (req, res) => {
  try {
    const userEmail = req.user.sub;
    
    const result = await User.findOneAndDelete({ email: userEmail });

    return res.json({
      status: "success",
      message: "User deleted",
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
