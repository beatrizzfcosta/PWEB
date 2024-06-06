const express = require("express");
const router = express.Router();
const User = require("../../../models/user/user");
const { extractUserIdFromToken } = require("../../../database/dbFunctions/dbF");
const upload = require("../../../database/dbFunctions/dbImages"); // Adjust path if necessary

router.patch("/", async (req, res) => {
  try {
    const { username, firstName, lastName, email } = req.body;
    const userUsername = extractUserIdFromToken(req.headers.authorization);

    if (!username || !firstName || !lastName || !email) {
      return res.status(400).send({
        status: 'fail',
        message: "Can't find all necessary information"
      });
    }

    const existingUser = await User.findOne({
      $and: [
        { $or: [{ email: email }, { username: username }] },
        { username: { $ne: userUsername } }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email or username already in use.",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
        { username: userUsername },
        { $set: { username, firstName, lastName, email } },
        { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: "fail",
        message: "User doesn't exist",
      });
    }

    return res.json({
      status: "success",
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error.",
    });
  }
});

router.patch('/image', upload.single('image'), async (req, res) => {
  try {
    const userUsername = extractUserIdFromToken(req.headers.authorization);
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const imagePath = `${imageFile.filename}`;

    const user = await User.findOneAndUpdate(
        { username: userUsername },
        { image: imagePath },
        { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'User image updated successfully',
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
