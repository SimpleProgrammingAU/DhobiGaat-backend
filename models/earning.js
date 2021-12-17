const mongoose = require("mongoose");
const earningSchema = new mongoose.Schema(
  {
    admin_id: { type: String, required: true },
    earning: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Earning", earningSchema);
