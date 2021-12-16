const router = require("express").Router();
const order = require("../models/order");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

//post order in the DB

router.post("/order", async (req, res) => {
  const newOrder = new order({
    customer_id: req.body.customer_id,
    order_type: req.body.order_type,
    order_status: req.body.order_status,
  });
  try {
    const orders = await newOrder.save();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all order

router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
