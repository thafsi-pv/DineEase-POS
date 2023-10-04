const mongoose = require("mongoose");
const LoyaltyProgram = require("../model/loyaltyModal"); // Import your Mongoose model

// Function to save a new transaction
async function addLoyltyPoint(req, res) {
  try {
    const { userId, amount, type } = req.body;

    // Create a new transaction object
    const transaction = {
      amount,
      point: amount * 0.1,
      type,
    };

    // Find the loyalty program document for the user
    const loyaltyProgram = await LoyaltyProgram.findOne({ userId });

    if (!loyaltyProgram) {
      // If no loyalty program exists for the user, create a new one
      const newLoyaltyProgram = new LoyaltyProgram({
        userId,
        transactions: [transaction], // Add the transaction to the transactions array
      });

      await newLoyaltyProgram.save(); // Save the new loyalty program
    } else {
      // If a loyalty program exists for the user, add the transaction to the transactions array
      loyaltyProgram.transactions.push(transaction);
      await loyaltyProgram.save(); // Save the updated loyalty program
    }
    res.status(200).json({ message: "successfull added" });
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).json({ message: "error in loyalty program" });
    throw error;
  }
}

module.exports = addLoyltyPoint;
