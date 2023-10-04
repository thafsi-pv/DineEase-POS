const Order = require("../model/orderModal");
const { addLoyltyPoint } = require("./loyaltyProgram");

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
      totalAmount: parseFloat(totalAmount), 
      totalTax: parseFloat(totalTax),
      paymentType,
      transactionId,
      orderDate: new Date(orderDate).toISOString(),
      status,
    });

    // Save the new order
    const savedOrder = await newOrder.save();
    //Save Loyalty transaction
    const loyaltyPoint = await addLoyltyPoint(
      savedOrder._id,
      customer,
      parseFloat(totalAmount),
      "credit"
    );
    savedOrder.loyaltyPoint = loyaltyPoint;
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createOrder };
