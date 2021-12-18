const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema(
  {
    admin_id: { type: String, required: true, unique: true },

    service1: [
      {
        service: {
          type: String,
          default: "",
        },
        price: {
          type: Number,
          default: "Number",
        },
      },
    ],
    service2: [
      {
        service: {
          type: String,
          default: "",
        },
        price: {
          type: Number,
          default: "Number",
        },
      },
    ],
    service3: [
      {
        service: {
          type: String,
          default: "",
        },
        price: {
          type: Number,
          default: "Number",
        },
      },
    ],

    service4: [
      {
        service: {
          type: String,
          default: "",
        },
        price: {
          type: Number,
          default: "Number",
        },
      },
    ],
    service5: [
      {
        service: {
          type: String,
          default: "",
        },
        price: {
          type: Number,
          default: "Number",
        },
      },
    ],

    // service2: { type: String, defaut: "" },
    // service3: { type: String, defaut: "" },
    // service4: { type: String, defaut: "" },
    // service5: { type: String, defaut: "" },

    // service2: { type: Array, defaut: [] },
    // service3: { type: Array, defaut: [] },
    // service4: { type: Array, defaut: [] },
    // service5: { type: Array, defaut: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("service", servicesSchema);
