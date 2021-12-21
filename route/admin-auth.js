const router = require("express").Router();
const adminUser = require("../models/Admin");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken");

//REGISTER

router.post("/register", async (req, res) => {
  const newUser = new adminUser({
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    mobile_no: req.body.mobile_no,
    profilePic: req.body.profilePic,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
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
    const user = await adminUser.findOne({ email: req.body.email });
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

// DELETE admin account

router.delete("/delete/:id", async (req, res) => {
  try {
    await adminUser.findByIdAndDelete(req.params.id);
    res.status(200).json("Admin account has been deleted...");
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
    const updatedUser = await adminUser.findByIdAndUpdate(
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

//GET customer or admin-dhobie information

router.get("/find/:id", async (req, res) => {
  try {
    const user = await adminUser.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
