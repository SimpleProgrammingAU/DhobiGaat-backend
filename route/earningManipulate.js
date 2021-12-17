const router = require("express").Router();
const Earning = require("../models/earning");
const jwt = require("jsonwebtoken");

//post admin earning

router.post("/earning", async (req, res) => {
  const newEarning = new Earning({
    admin_id: req.body.admin_id,
    earning: req.body.earning,
  });
  try {
    const earning = await newEarning.save();
    res.status(201).json(earning);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
