const router = require("express").Router();

//post
router.post("/", async (req, res) => {

  try {

    ///////////////////// DB code here /////////////////////
    const hash = bcrypt.hashSync(password, 14);
    ///////////////////// DB code here /////////////////////

    return res.json({
      status: "success",
      message: "User posted",
    });
  } catch (error) {

    console.log(error);
    return res.json({
      status: "fail",
      message: "Wasn't possible to post a user now",
    });

  }
});

module.exports = router;
