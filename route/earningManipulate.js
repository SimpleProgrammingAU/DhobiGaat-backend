const router = require("express").Router();
const Earning = require("../models/earning");
const jwt = require("jsonwebtoken");

//post admin earning for the first time

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

// get earning of admin whthere he has earning or not

router.get("/earning/:id", async (req, res) => {
  try {
    const oldEarning = await Earning.find({ admin_id: req.params.id });

    res.status(201).json(oldEarning);
  } catch (err) {
    res.status(500).json(err);
  }
});

// upadte earning of admin

router.put("/update/:id", async (req, res) => {
  try {
    const oldEarning = await Earning.find({ admin_id: req.params.id });

    if (oldEarning) {
      req.body.earning += oldEarning[0].earning;
      // console.log(req.body.earning);
      const earning = await Earning.findByIdAndUpdate(
        req.body.admin_id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(earning);
    } else {
      res.status(400).json("there is no old earning of this admin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
