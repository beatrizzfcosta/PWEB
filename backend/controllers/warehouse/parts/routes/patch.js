//patch part

const express = require("express");
const router = express.Router();
const Part = require("../../../../models/part/part");

router.patch("/", async (req, res) => {
  try {

    const {name, quantityUsed } = req.body;

    if ( !name || !quantityUsed) {
      return res.status(400).send({
        status: 'fail',
        message: "Can't find all necessary information"
      });
    }

    await Part.findOne({ name: name })
        .then(async (part)=>{
          if (!part) {
            return res.status(404).json({
              status: "fail",
              message: "Part doesn't exist",
            });
          }

          const updatedQuantity = part.quantity - quantityUsed;

          if (updatedQuantity < 0) {
            return res.status(400).json({
              status: 'fail',
              message: 'Quantity cannot be negative',
            });
          }

          await Part.updateOne(
              { name: name },
              { $set: { quantity: updatedQuantity } }
          )
              .then(()=>{
                return res.json({
                  status: "success",
                  message: "Part updated successfully",
                  updatedQuantity: updatedQuantity,
                });
              })
              .catch((error)=>{
                console.error(error);
              })



        })
        .catch((error)=>{
          console.error(error);
        })

  } catch (error) {
    return res.json({
      status: "fail",
      message: "Internal server error.",
    });
  }
});

module.exports = router;