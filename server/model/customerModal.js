const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      default: "",
    },
    mobile: { type: Number, required: true },
    email: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    isActive: { type: Boolean, default: true },
    loyaltyCard: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
