//post part

const express = require("express");
const router = express.Router();
const Part = require("../../../../models/peca/peca");

router.post("/", (req, res) => {
  try{
    const { name,type,specifications,quantity } = req.body;

    if (!name || !type || !specifications || !quantity) {
      return res.status(400).send({
        status: "fail",
        mensagem: "Missing something",
      });
    }

      Part
          .findOne({name: name})
          .then((result)=>{
              if(result!=null){
                  return res.status(400).json({
                      status: "fail",
                      message: "Part already exists",
                  });
              }
              else{
                  Part
                      .create({
                      name,
                      type,
                      specifications,
                      quantity,
                  })
                      .then(()=>{
                          return res.json({
                              status: "success",
                              message: "Part created",
                          });
                      })
                      .catch((error)=>{
                          console.error(error);
                          return res.status(400).json({
                              status: "fail",
                              message: "Error trying to create a new part.",
                          });
                      })




              }
          })
          .catch((error)=>{
              console.error(error);
              return res.status(400).json({
                  status: "fail",
                  message: "Error trying to find a part.",
              });
      });


    

  }catch(error){
      console.error(error);
    return res.json({
      status: "fail",
      message: "Internal server error.",
    });
  }
});

module.exports = router;
