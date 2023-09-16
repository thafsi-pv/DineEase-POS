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
    const isActive = req.query.active;
    let products;
    if (isActive === "true") {
      products = await Product.find({ isActive: true });
    } else if (isActive === "false") {
      products = await Product.find({ isActive: false });
    } else {
      // If no value provided or any other value, fetch all products
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const _id = req.query.id;
    const product = await Product.find({ _id });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

module.exports = { addProduct, getAllProducts, getProductById };
