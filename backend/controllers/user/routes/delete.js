const router = require("express").Router();

//delete
router.delete("/", async (req, res) => {

  try {
    ///////////////////// DB code here /////////////////////

    return res.json({ 
      status: "success", 
      message: "User deleted" 
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
