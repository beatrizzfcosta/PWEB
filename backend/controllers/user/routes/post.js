//user signup post

const router = require("express").Router();
var jwt = require("jsonwebtoken");
const JWT_SECRET = require("../../../configs/SECRET");
const TIME_TO_LIVE = require("../../../configs/token_expiration_time");

//post 
router.post("/", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!checkEmail(email)) {
      res.status(400).json({
        status: "Failure",
        message: "Email already in use",
      });
      return;
    }

    const token = generateToken(email, password);

    res.status(201).json({
      status: "Success",
      message: "User signedup",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: "Signup failed",
      error: error.message,
    });
  }
});

function generateToken(email, password) {
  const payload = { sub: email, name: password };
  const token = jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: TIME_TO_LIVE,
  });

  return token;
}

function checkEmail(email) {
  // do mongo stuff to look if email is already in use
  // maybe have this function in database folder on home
  return false;
}
function teste(){
  const models = require("../../../models/index")
  const nodemailer = require("nodemailer");
  const {v4: uuidv4} = require("uuid");
  require("dotenv").config();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS
    }
  })
  transporter.verify((error,success)=>{
    if(error)
      console.error(error);
    else{
      console.log("Ready for messages");
      console.log(success);
    }

  })
}
module.exports = router;
