const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema(
  {
    admin_id: { type: String, required: true, unique: true },
    service1: { type: String, defaut: "" },
    service2: { type: String, defaut: "" },
    service3: { type: String, defaut: "" },
    service4: { type: String, defaut: "" },
    service5: { type: String, defaut: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("service", servicesSchema);
