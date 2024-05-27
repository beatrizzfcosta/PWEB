//auth.js middleware

const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const JWT_SECRET = require("../configs/SECRET");

router.use((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      status: "Failure",
      message: "No token provided",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      status: "Failure",
      message: "Invalid token",
      errorMsg : error.message,
    });
  }
});

module.exports = router;