const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transaction_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const loyaltyProgramSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  transactions: [transactionSchema], // Add a field for transaction history
});

const LoyaltyProgram = mongoose.model("LoyaltyProgram", loyaltyProgramSchema);

module.exports = LoyaltyProgram;
