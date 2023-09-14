const Product = require("../model/productModal");
const mongoose = require("mongoose");

async function addProduct(req, res) {
  try {
    const {
      itemName,
      price,
      category,
      cuisine,
      isActive,
      remarks,
      hasPortions,
      portions,
      imageUrl,
    } = req.body;
    console.log("🚀 ~ file: product.js:17 ~ addProduct ~ req.body:", req.body);

    const newProduct = new Product({
      itemName,
      price,
      category,
      cuisine,
      isActive,
      remarks,
      hasPortions,
      portions,
      imageUrl,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error adding the product" });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const activeProducts = await Product.find({ isActive: true });
    res.status(200).json(activeProducts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

module.exports = { addProduct, getAllProducts };
