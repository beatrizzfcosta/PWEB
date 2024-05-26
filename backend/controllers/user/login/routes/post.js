//login post

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../../../../configs/SECRET");
const TIME_TO_LIVE = require("../../../../configs/token_expiration_time");
const User = require("../../../../models/user/user");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "Failure",
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "Failure",
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Failure",
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user.email, user.username);

    res.status(200).json({
      status: "Success",
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: "Login failed",
      error: error.message,
    });
  }
});

function generateToken(email, username) {
  const payload = { sub: email, name: username };
  const token = jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: TIME_TO_LIVE,
  });

  return token;
}

module.exports = router;