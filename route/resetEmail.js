const router = require("express").Router();
const User = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

// Rest email of user

router.post("/resetPassword", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(500)
          .json({ error: "User dont exists with that email" });
      }

      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "mi477048@gmail.com",
            pass: "samarbagh1234",
          },
        });

        var mailOptions = {
          from: "E-dhobieGaat",
          to: "hariskhan033192@gmail.com",
          subject: "Password Reset",
          html: `
    <h3>You requested for password reset</h3>
    <p>Click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset your password </p>
    `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      });
    });
  });

  res.json({ message: "Check your email" });

  //   var transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "mi477048@gmail.com",
  //       pass: "samarbagh1234",
  //     },
  //   });

  //   var mailOptions = {
  //     from: "mi477048@gmail.com",
  //     to: "18mdswe013@uetmardan.edu.pk",
  //     subject: "Sending Email using Node.js",
  //     text: `Hi Smartherd, thank you for your nice Node.js tutorials.
  //           I will donate 50$ for this course. Please send me payment options.`,
  //     // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
  //   };

  //   transporter.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log("Email sent: " + info.response);
  //     }
  //   });
});
module.exports = router;
