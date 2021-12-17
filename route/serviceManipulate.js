const router = require("express").Router();
const services = require("../models/services");

//post admin services in the db

router.post("/post", async (req, res) => {
  const newService = new services({
    admin_id: req.body.admin_id,
    service1: req.body.service1,
    service2: req.body.service2,
    service3: req.body.service3,
    service4: req.body.service4,
    service5: req.body.service5,
  });
  try {
    const services = await newService.save();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get services of admin from db

router.get("/find/:id", async (req, res) => {
  try {
    const service = await services.find({ admin_id: req.params.id });
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
