const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer_id: { type: String, required: true },
    order_type: { type: String, defaut: "normal" },
    order_status: { type: String, required: true },
    order_price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
