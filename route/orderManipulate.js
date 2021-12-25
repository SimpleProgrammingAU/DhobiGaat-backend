const router = require("express").Router();
const order = require("../models/order");
const admin = require("../models/Admin");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
var messagebird = require("messagebird")("3IrLVHKY91Tg1CX24m1knZeRr");

//post order in the DB

router.post("/newOrder", async (req, res) => {
  const newOrder = new order({
    customer_id: req.body.customer_id,
    admin_id: req.body.admin_id,
    order_type: req.body.order_type,
    order_status: req.body.order_status,
    order_price: req.body.order_price,
    order_address: req.body.order_address,
    order_pickDate: req.body.order_pickDate,
    order_pickTime: req.body.order_pickTime,
  });
  try {
    const orders = await newOrder.save();

    //code to send message to the selected dhobie

    // write code to send push notification to the selected dhobie

    // let dhobie_admin;
    // if (orders) {
    //   dhobie_admin = await admin.findById(orders.admin_id);

    //   var phone_number = dhobie_admin.mobile_no;
    //   var params = {
    //     originator: "TestMessage",
    //     recipients: phone_number,
    //     body: "Dear admin, You have a new order placed, check your inbox. Regard E-dhobiGaat",
    //   };

    //   messagebird.messages.create(params, function (err, response) {
    //     if (err) {
    //       return console.log(err);
    //     }
    //     console.log(response);
    //   });
    // }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all order about a specfic admin-dhobie

router.get("/find/:id", async (req, res) => {
  try {
    const orders = await order.find({ customer_id: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all processing and pending order about a specfic admin-dhobie
// we will show these things on service with each dhobie service profile

router.get("/findOrders/:id", async (req, res) => {
  try {
    const orders = await order
      .find({ admin_id: req.params.id, order_status: "processing" })
      .count();
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

// Get or Render order on dhobie admin-panel
// if it's not working properly then use this one
// find({ admin_id: req.params.id, order_status: "processing" })

router.get("/recentOrder/:id", async (req, res) => {
  try {
    const orders = await order.find(
      { admin_id: req.params.id } && { order_status: "processing" }
    );
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update the order_status of the order table

router.put("/update/:id", async (req, res) => {
  try {
    const updatedOrder = await order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    // send message to the seleted user
    // send push notification to the seleted user that your order has been accepted.

    // let phone_number = await admin.find({ admin_id: updatedOrder.admin_id });
    // // console.log(phone_number[0].mobile_no);
    // phone_number = phone_number[0].mobile_no;
    // var params = {
    //   originator: "TestMessage",
    //   recipients: phone_number,
    //   body: "Your order has been accepted. We will pick your clothes within 40 minutes. Regard: E-DhobiGaat",
    // };

    // messagebird.messages.create(params, function (err, response) {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   console.log(response);
    // });

    res.status(200).json(updatedOrder);
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
