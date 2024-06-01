const express = require("express");
const router = express.Router();
const Drone = require("../../../models/drone/drone");
const Part = require("../../../models/part/part");

router.get("/", async (req, res) => {
    try {

        Drone
            .find()
            .populate("compatibleParts")
            .then((result)=>{
                if(result.length === 0){
                    return res.json({
                        status: "fail",
                        message: "Drone doesn't exists"
                    });
                }
                else{
                    return res.json({
                        status: "success",
                        message: "Sent all drone",
                        data: result,
                    });

                }
            })
            .catch((error)=>{
                console.error(error);
                return res.status(400).json({
                    status: "fail",
                    message: "Error while trying to find a drone.",
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
