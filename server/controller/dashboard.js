const mongoose = require("mongoose");
const Order = require("../model/orderModal");

// Assuming you have your Order model defined as you mentioned

// Create a function to get monthly sales amounts
async function getMonthlySalesAmounts(req, res) {
  try {
    const result = await Order.aggregate([
      {
        $match: {
          status: "Completed", // Adjust the filter criteria if needed
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$orderDate" },
            month: { $month: "$orderDate" },
          },
          totalSales: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalSales: 1,
        },
      },
    ]);

    // return result;
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching monthly sales amounts:", error);
    // throw error;
    res.status(500).json(error);
  }
}

module.exports = { getMonthlySalesAmounts };
