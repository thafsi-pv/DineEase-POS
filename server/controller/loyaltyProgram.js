const mongoose = require("mongoose");
const LoyaltyProgram = require("../model/loyaltyModal"); // Import your Mongoose model

// Function to save a new transaction
async function addLoyltyPoint(tranId, customerId, amount, type) {
  try {
    const newPoint = amount * 0.1;
    const transaction = {
      transaction_id: tranId,
      amount,
      points: newPoint,
      type,
    };
    const loyaltyProgram = await LoyaltyProgram.findOne({ customerId });
    if (!loyaltyProgram) {
      const newLoyaltyProgram = new LoyaltyProgram({
        customerId,
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

const getTotalPoints = async (userId) => {
  const cusId = new mongoose.Types.ObjectId(userId); // Use 'new' keyword here
  const pipeline = [
    {
      $match: {
        customerId: cusId, // Use cusId directly here, as it's already an ObjectId
      },
    },
    {
      $unwind: "$transactions", // Split transactions array into individual documents
    },
    {
      $match: {
        "transactions.type": "credit", // Filter transactions with type = 'credit'
      },
    },
    {
      $group: {
        _id: "$customerId",
        totalPoints: { $sum: "$transactions.points" }, // Sum the points for each transaction
      },
    },
  ];

  const result = await LoyaltyProgram.aggregate(pipeline);
  return result[0].totalPoints;
};

module.exports = { addLoyltyPoint, getTotalPoints };
