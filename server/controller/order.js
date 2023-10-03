const Order = require("../model/orderModal");

// Define a controller function to create a new order
const createOrder = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      customer,
      items,
      totalAmount,
      totalTax,
      paymentType,
      transactionId,
      orderDate,
      status,
    } = req.body;

    // Create a new order instance
    const newOrder = new Order({
      customer,
      items,
      totalAmount: parseFloat(totalAmount), // Convert to a numeric value
      totalTax: parseFloat(totalTax), // Convert to a numeric value
      paymentType,
      transactionId,
      orderDate: new Date(orderDate).toISOString(), // Convert to a Date object
      status,
    });

    // Save the new order to the database
    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder); // Respond with the saved order data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createOrder };
