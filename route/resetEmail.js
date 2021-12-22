const router = require("express").Router();
const User = require("../models/User");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

// Rest email of user

router.post("/resetPassword", async (req, res) => {
  const forgetEmail = req.body.email;
  try {
    const user = await User.findOne({ email: forgetEmail });
    if (!user) {
      return res
        .status(500)
        .json({ error: "User dont exists with that email" });
    }

    const secret = process.env.SECRET_KEY + user.password;
    const payload = {
      email: user.email,
      id: user.id,
    };

    // set expiration time for the link

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mi477048@gmail.com",
        pass: "samarbagh1234",
      },
    });

    var mailOptions = {
      from: "E-dhobieGaat",
      to: user.email,
      subject: "Password Reset",
      html: `
    <h3>You requested for password reset</h3>
    <p>Click in this <a href="http://localhost:3000/reset/${user.id}/${token}">link</a> to reset your password </p>
    `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({ message: "Check your email" });
  } catch (error) {
    console.log(error);
  }
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

// updated the password

router.post("/new-password/:id/:token", async (req, res, next) => {
  const { id, token } = req.params;

  const user = await User.findById(id);

  if (id !== user.id) {
    res.send("Invalid Id... ");
  }

  const newPassword = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.SECRET_KEY
  ).toString();

  const secret = process.env.SECRET_KEY + user.password;
  try {
    const payload = jwt.verify(token, secret);
    const passwordUpdated = await User.findByIdAndUpdate(payload.id, {
      $set: { password: newPassword },
    });

    // newPassword: CryptoJS.AES.encrypt(
    //     req.body.password,
    //     process.env.SECRET_KEY
    //   ).toString()

    res.status(200).json(passwordUpdated);
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.post("/new-password", (req, res) => {
//     const newPassword = req.body.password;
//     const sentToken = req.body.Token;
//     User.findone({
//       resetToken: sentToken,
//       expireToken: { $gt: Date.now() },
//     })
//       .then((user) => {
//         if (!user) {
//           return res.status(500).json({ error: "Try again session expired" });
//         }
//         bcrypt.hash(newPassword, 12).then((hashedpassword) => {
//           user.password = hashedpassword;
//           user.resetToken = undefined;
//           user.expireToken = undefined;
//           user.save().then((saveduser) => {
//             res.json({ message: "password updated success" });
//           });
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });

module.exports = router;
