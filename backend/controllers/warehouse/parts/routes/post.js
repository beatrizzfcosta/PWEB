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

    if (Part.findOne({name: name})) {
      return res.status(400).json({
        status: "fail",
        message: "Part already exists",
      });
    }
    
    Part.create({
      name,
      type,
      specifications,
      quantity,
    });

    return res.json({
      status: "success",
      message: "Part created",
    });
  }catch{
    return res.json({
      status: "fail",
      message: "Internal server error.",
    });
  }
});

module.exports = router;
