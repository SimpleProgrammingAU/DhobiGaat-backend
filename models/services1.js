const mongoose = require("mongoose");
const servicesSchema = new mongoose.Schema(
  {
    admin_id: { type: String, required: true, unique: true },
    frequency_order: { type: String, required: true },
    isService: { type: String, default: "false" },
    // Array: [
    Services: [
      {
        Location: {
          type: String,
          default: "",
        },
        NormalNo: {
          type: String,
          default: "",
        },
        NormalPrice: {
          type: String,
          default: "",
        },
        UrgentNO: {
          type: String,
          default: "",
        },
        UrgentPrice: {
          type: String,
          default: "",
        },
        Checked: {
          type: String,
          default: "false",
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
          type: String,
          default: "",
        },
        NormalPrice: {
          type: String,
          default: "",
        },
        UrgentNO: {
          type: String,
          default: "",
        },
        UrgentPrice: {
          type: String,
          default: "",
        },
        Checked: {
          type: String,
          default: "false",
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
          type: String,
          default: "",
        },
        NormalPrice: {
          type: String,
          default: "",
        },
        UrgentNO: {
          type: String,
          default: "",
        },
        UrgentPrice: {
          type: String,
          default: "",
        },
        Checked: {
          type: String,
          default: "false",
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
          type: String,
          default: "",
        },
        NormalPrice: {
          type: String,
          default: "",
        },
        UrgentNO: {
          type: String,
          default: "Number",
        },
        UrgentPrice: {
          type: String,
          default: "",
        },
        Checked: {
          type: String,
          default: "false",
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
          type: String,
          default: "",
        },
        NormalPrice: {
          type: String,
          default: "",
        },
        UrgentNO: {
          type: String,
          default: "",
        },
        UrgentPrice: {
          type: String,
          default: "",
        },
        Checked: {
          type: String,
          default: "false",
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
