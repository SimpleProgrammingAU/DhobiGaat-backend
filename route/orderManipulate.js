const router = require("express").Router();
const order = require("../models/order");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
var messagebird = require("messagebird")("G7SBMP1y6OcTr24RVRcUva2pL");

//post order in the DB

router.post("/newOrder", async (req, res) => {
  const newOrder = new order({
    customer_id: req.body.customer_id,
    order_type: req.body.order_type,
    order_status: req.body.order_status,
    order_price: req.body.order_price,
    order_address: req.body.order_address,
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

// Get all pending order

router.get("/pendingOrder", async (req, res) => {
  try {
    const orders = await order.find({ order_status: "processing" }).count();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all completed order

router.get("/completedOrder", async (req, res) => {
  try {
    const orders = await order.find({ order_status: "delivered" }).count();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all cancelled order

router.get("/cancelledOrder", async (req, res) => {
  try {
    const orders = await order.find({ order_status: "cancelled" }).count();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get/Render order on dhobie admin-panel 

router.get("/recentOrder", async (req, res) => {
  try {
    const orders = await order.find({ order_status: "cancelled" }).count();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});




// send message to the phone number

router.get("/send", async (req, res) => {
  try {
    var phone_number = "+923029463719";
    var params = {
      originator: "TestMessage",
      recipients: phone_number,
      // recipients: ["+923161921936"],
      body: "Your order has been accepted. We will pick your clothes within 40 minutes. Regard: E-DhobiGaat",
    };

    messagebird.messages.create(params, function (err, response) {
      if (err) {
        return console.log(err);
      }
      console.log(response);
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
