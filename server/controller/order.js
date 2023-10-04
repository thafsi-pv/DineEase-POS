const Customer = require("../model/customerModal");
const Order = require("../model/orderModal");
const { addLoyltyPoint, getTotalPoints } = require("./loyaltyProgram");

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

    //select default customer from customers
    const defaultCustomerId = await Customer.findOne({
      isDefault: true,
    }).select("_id");
    let loyaltyPoint = 0;
    let totalPoint = 0;
    if (customer != defaultCustomerId?._id) {
      //Save Loyalty transaction
      loyaltyPoint = await addLoyltyPoint(
        savedOrder._id,
        customer,
        parseFloat(totalAmount),
        "credit"
      );
      totalPoint = await getTotalPoints(customer);
      console.log(
        "🚀 ~ file: order.js:55 ~ createOrder ~ totalPoint:",
        totalPoint
      );
    }
    const obj = savedOrder.toObject(); //convert to plain js object to mutate object
    obj.loyaltyPoint = loyaltyPoint;
    obj.totalPoint = totalPoint;
    res.status(200).json(obj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createOrder };
