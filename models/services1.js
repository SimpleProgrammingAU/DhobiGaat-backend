const mongoose = require("mongoose");
const servicesSchema = new mongoose.Schema(
  {
    admin_id: { type: String, required: true, unique: true },
    frequency_order: { type: Number, required: true },
    // Array: [
    Services: [
      {
        Location: {
          type: String,
          default: "",
        },
        NormalNo: {
          type: Number,
          default: "Number",
        },
        NormalPrice: {
          type: Number,
          default: "Number",
        },
        UrgentNO: {
          type: Number,
          default: "Number",
        },
        UrgentPrice: {
          type: Number,
          default: "Number",
        },
        Checked: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          default: "",
        },
        img: {
          type: String,
          default: "",
        },
        title: {
          type: String,
          default: "",
        },
      },
      {
        Location: {
          type: String,
          default: "",
        },
        NormalNo: {
          type: Number,
          default: "Number",
        },
        NormalPrice: {
          type: Number,
          default: "Number",
        },
        UrgentNO: {
          type: Number,
          default: "Number",
        },
        UrgentPrice: {
          type: Number,
          default: "Number",
        },
        Checked: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          default: "",
        },
        img: {
          type: String,
          default: "",
        },
        title: {
          type: String,
          default: "",
        },
      },
      {
        Location: {
          type: String,
          default: "",
        },
        NormalNo: {
          type: Number,
          default: "Number",
        },
        NormalPrice: {
          type: Number,
          default: "Number",
        },
        UrgentNO: {
          type: Number,
          default: "Number",
        },
        UrgentPrice: {
          type: Number,
          default: "Number",
        },
        Checked: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          default: "",
        },
        img: {
          type: String,
          default: "",
        },
        title: {
          type: String,
          default: "",
        },
      },
      {
        Location: {
          type: String,
          default: "",
        },
        NormalNo: {
          type: Number,
          default: "Number",
        },
        NormalPrice: {
          type: Number,
          default: "Number",
        },
        UrgentNO: {
          type: Number,
          default: "Number",
        },
        UrgentPrice: {
          type: Number,
          default: "Number",
        },
        Checked: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          default: "",
        },
        img: {
          type: String,
          default: "",
        },
        title: {
          type: String,
          default: "",
        },
      },
      {
        Location: {
          type: String,
          default: "",
        },
        NormalNo: {
          type: Number,
          default: "Number",
        },
        NormalPrice: {
          type: Number,
          default: "Number",
        },
        UrgentNO: {
          type: Number,
          default: "Number",
        },
        UrgentPrice: {
          type: Number,
          default: "Number",
        },
        Checked: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
          default: "",
        },
        img: {
          type: String,
          default: "",
        },
        title: {
          type: String,
          default: "",
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("service", servicesSchema);
