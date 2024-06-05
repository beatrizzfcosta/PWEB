const express = require("express");
const router = express.Router();
const User = require("../../../models/user/user");
const {extractUserIdFromToken}  = require("../../../database/dbFunctions/dbF"); // Import the function for extracting the user ID from the JWT
router.get("/", async (req, res) => {
    try {
        const userUsername = extractUserIdFromToken(req.headers.authorization);
        User
            .findOne({username: userUsername})
            .then((result)=>{
                if(result.length === 0){
                    return res.json({
                        status: "fail",
                        message: "User doesn't exists",
                        test:" ->"+ userUsername
                    });
                }
                else{
                    return res.json({
                        status: "success",
                        message: "Sent all users",
                        data: result,
                    });

                }
            })
            .catch((error)=>{
                console.error(error);
                return res.status(400).json({
                    status: "fail",
                    message: "Error while trying to find a user.",
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