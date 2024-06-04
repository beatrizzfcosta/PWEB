//post
const express = require("express");
const router = express.Router();
const Drone = require("../../../models/drone/drone");
const Part = require("../../../models/part/part");
router.post("/",  async(req, res) => {
    try {
        const { model, manufacturer, compatibleType, compatibleParts, quantity, testList } = req.body;

        // Check if any required fields are missing
        if (!model || !manufacturer ||!compatibleType||!compatibleParts || !compatibleParts || !quantity) {

            return res.status(400).json({
                status: "fail",
                message: "Missing required fields",
            });
        }

        const partIds = await Promise.all(compatibleParts.map(async (partName) => {
            const part = await Part.findOne({ name: partName });
            if (!part) {
                throw new Error(`Part '${partName}' not found`);

            }
            return part._id;
        }));

        Drone.findOne({model: model})
            .then(async (result) => {
                if (result != null) {
                    return res.status(400).json({
                        status: "fail",
                        message: "Drone already exists",
                    });
                } else {

                    Drone.create({
                        model,
                        manufacturer,
                        compatibleType,
                        compatibleParts: partIds,
                        quantity,
                        testList
                        })
                        .then(() => {
                            return res.status(201).json({
                                status: "success",
                                message: "Drone created",
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                            return res.status(400).json({
                                status: "fail",
                                message: "Error creating a new drone",
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

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "fail",
            message: "Internal server error",
        });
    }
});

module.exports = router;