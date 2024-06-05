//delete

const express = require("express");
const router = express.Router();
const Project = require("../../../models/project/project");

router.delete("/", async (req, res) => {
  try {
    const name = req.query.name; // Retrieve query parameter "name"

     await Project
        .deleteOne({ name: name })
         .then((result)=>{
           if(result.deletedCount === 0)
             res.status(400).json({
               status: "fail",
               message: "The specified project does not exist.",
             });
           else
             res.json({
               status: "success",
               message: "Project deleted",
             });
         })
         .catch((error)=>{
              console.error(error);
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

