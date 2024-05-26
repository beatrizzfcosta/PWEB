//user signup post

const router = require("express").Router();
const User = require("../../../models/user/user")
const NewVerification = require("../../../models/user/userVerification")

//Email verification stuff
const nodemailer = require("nodemailer");
const {v4: uuidv4} = require("uuid");
require("dotenv").config();
const bcrypt = require("bcrypt");
const {join} = require("path");

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
///////////////////////////

//post
router.post("/", (req, res) => {
  try {
    const { firstName,lastName,username,email, password } = req.body;

    if ( !firstName||!lastName || !username || !email || !password) {
      return res.status(400).send({
        status: 'error',
        mensagem: 'Missing something'
      });
    }

    if (!checkEmail(email) ) {
      return res.status(400).json({
        status: "Failur",
        message: "Email already in use",
      });
    }

    if (!checkUsername(username) ) {
      return res.status(400).json({
        status: "Failu",
        message: "Username already in use",
      });
    }

    User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      verification: false
    }).then((result) => {
      sendVerificationEmail(result,res);
    });

  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: "Signup failed",
      error: error.message,
    });
  }
});

router.get("/verify/:userId/:uniqueString",(req,res)=>{
  let{userId,uniqueString }=req.params;
  NewVerification
      .find({userId})
      .then((result)=>{
        if(result.length > 0){

          const {expiresAt} = result[0];
          const hashedUniqueString = result [0].uniqueString;
          if(expiresAt<Date.now()){
            NewVerification
                .deleteOne({userId})
                .then((result)=>{
                  User
                      .deleteOne({_id:userId})
                      .then(()=>{
                        let message = "Link has expired. Please sign up again."
                        res.redirect(`/user/verified/error=true&message=${message}`);
                      })
                      .catch((error)=>{
                        let message = "Clearing user with expired unique string failed"
                        res.redirect(`/user/verified/error=true&message=${message}`);
                      })
                })

                .catch((error)=>{
                  console.error(error);
                  let message = "An error occured while checking for existing user verification record"
                  res.redirect(`/user/verified/error=true&message=${message}`);
                })
          }else{
            bcrypt
                .compare(uniqueString,hashedUniqueString)
                .then((result)=>{
                  if(result){
                    User
                        .updateOne({
                          _id:userId
                        },{
                          $set:{
                            verification: true
                          }
                        })
                        .then(()=>{
                          NewVerification
                              .deleteOne({userId})
                              .then(()=>{
                                res.sendFile(join(__dirname, "../../../../frontend/pages/home.html"));
                              })
                              .catch((error)=>{
                                console.error("An error occurred while finalizing successful verification.")
                                res.redirect(`/user/verified/error=true&message=${message}`);
                              })
                        })
                        .catch((error)=>{
                          console.error(error);
                          let message = "An error occurred while updating user record to show verified."
                          res.redirect(`/user/verified/error=true&message=${message}`);
                        })
                  }
                  let message = "An error "
                })
          }

        }else{
          let message = "Account record dosen't exist or has been verified already. Please sign up or log in.";
          res.redirect(`/user/verified/error=true&message=${message}`);
        }
      })
      .catch((error)=>{
        console.error(error);
        let message = "An error occurred while checking for existing user verification record";
        res.redirect(`/user/verified/error=true&message=${message}`);
  })
})

const sendVerificationEmail = ({_id,email},res) =>{
  const currentUrl = "http://localhost:15000/";
  const uniqueString = uuidv4() + _id;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Verify your email address to complete the signup and login into your account.</p>
           <p>This link <b>expires in 6 hours</b>.</p>
           <p>Press <a href=${currentUrl + "verify/" + _id + "/"+uniqueString }>here</a> to proceed.</p>`
  };

  const saltRounds = 10;

  bcrypt
      .hash(uniqueString, saltRounds)
      .then((hashedUniqueString)=>{
        NewVerification
            .create({
              userId:_id,
              uniqueString: hashedUniqueString,
              createdAt: Date.now(),
              expiresAt: Date.now() + 21600000
            })
            .then(() => {
              transporter
                  .sendMail(mailOptions)
                  .then(()=>{
                    res.json({
                      status: "pending",
                      message: "Verification email sent"
                    });
                  })
                  .catch((error)=>{
                    console.error(error);
                    res.json({
                      status: "fail",
                      message: "Verification email failed"
                    });
                  })
        });
      })
}

module.exports = router;
