const router = require("express").Router();
const order = require("../models/order");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

//post order in the DB

router.post("/newOrder", async (req, res) => {
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

//GET all order about a specfic customer

router.get("/find/:id", async (req, res) => {
  try {
    const orders = await order.find({ customer_id: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET total number of order

router.get("/totalOrder", async (req, res) => {
  try {
    const orders = await order.count();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
