const Order = require("../model/orderModal");

async function createOrder(req, res) {
  try {
    const data = req.body;
    console.log("🚀 ~ file: order.js:6 ~ createOrder ~ data:", data);
  } catch (error) {}
}

module.exports = { createOrder };
