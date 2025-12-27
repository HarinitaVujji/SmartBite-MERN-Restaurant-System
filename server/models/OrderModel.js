const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customerName: String,
    email: String,
    phone: String,
    address: String,
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      }
    ],
    total: Number,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

// Export in CommonJS style
module.exports = mongoose.model("Order", OrderSchema);
