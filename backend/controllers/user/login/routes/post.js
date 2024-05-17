const router = require("express").Router();

//post
router.post("/", (req, res) => {
  try {
    ///////////////////// DB code here /////////////////////

    return res.json({
      status: "success",
      message: "User logged",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "fail",
      message: "Wasn't possible to login the user now",
    });
  }
});

module.exports = router;
