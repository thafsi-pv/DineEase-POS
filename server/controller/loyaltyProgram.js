const mongoose = require("mongoose");
const LoyaltyProgram = require("../model/loyaltyModal"); // Import your Mongoose model

// Function to save a new transaction
async function addLoyltyPoint(tranId, userId, amount, type) {
  try {
    const newPoint = amount * 0.1;
    const transaction = {
      transaction_id: tranId,
      amount,
      type,
    };
    const loyaltyProgram = await LoyaltyProgram.findOne({ userId });
    if (!loyaltyProgram) {
      const newLoyaltyProgram = new LoyaltyProgram({
        userId,
        points: newPoint,
        transactions: [transaction],
      });
      await newLoyaltyProgram.save();
    } else {
      loyaltyProgram.transactions.push(transaction);
      await loyaltyProgram.save();
    }
    return newPoint;
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ message: "error in loyalty program" });
    throw error;
  }
}

module.exports = { addLoyltyPoint };
