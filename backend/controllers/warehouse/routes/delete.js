const express = require("express");
const router = express.Router();
const Drone = require("../../../models/drone/drone");

router.delete("/", async (req, res) => {
    try {
        const model = req.body.model;

        await Drone.deleteOne({ model: model })
            .then((result)=>{
                if(result.deletedCount === 0)
                     res.status(400).json({
                        status: "fail",
                        message: "The specified drone does not exist.",
                    });
                else
                     res.json({
                        status: "success",
                        message: "Drone deleted",
                    });
            })
            .catch((error)=>{
                console.error(error);
            })


    } catch (error) {
        console.log(error);
        return res.json({
            status: "fail",
            message: "Internal server error.",
        });
    }
});


module.exports = router;