//get part

const express = require("express");
const router = express.Router();
const Part = require("../../../../models/peca/peca");

router.get("/", async (req, res) => {
  try {

    Part
        .find()
        .then((result)=>{
          if(result.length === 0){
            return res.json({
              status: "fail",
              message: "Part doesn't exists"
            });
          }
          else{
            return res.json({
              status: "success",
              message: "Part something something",
              part: result,
            });

          }
        })
        .catch((error)=>{
          console.error(error);
          return res.status(400).json({
            status: "fail",
            message: "Error trying to find a part.",
          });
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