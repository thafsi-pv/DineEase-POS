const mongoose = require("mongoose");
const LoyaltyProgram = require("../model/loyaltyModal");

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

const aggragateTotalPointPipeline = (customerId) => [
  {
    $match: {
      customerId: customerId,
    },
  },
  {
    $unwind: "$transactions",
  },
  {
    $match: {
      "transactions.type": "credit",
    },
  },
  {
    $group: {
      _id: "$customerId",
      totalPoints: { $sum: "$transactions.points" },
    },
  },
];

const getTotalPoints = async (userId) => {
  const cusId = new mongoose.Types.ObjectId(userId);
  const pipeline = aggragateTotalPointPipeline(cusId);
  const result = await LoyaltyProgram.aggregate(pipeline);
  return result[0].totalPoints;
};

const getTotalPointsByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.query;
    const cusId = new mongoose.Types.ObjectId(customerId);
    const pipeline = aggragateTotalPointPipeline(cusId);
    const result = await LoyaltyProgram.aggregate(pipeline);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { addLoyltyPoint, getTotalPoints, getTotalPointsByCustomerId };
