const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    profilePic: req.body.profilePic,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
    owner: req.body.owner,
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong password or username!");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username!");

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE user account

router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User account has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update admin account

router.put("/update/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET a user information

router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all user information information

router.get("/find/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
