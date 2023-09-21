const Product = require("../model/productModal");
const mongoose = require("mongoose");

async function addProduct(req, res) {
  try {
    const {
      _id,
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

    let savedProduct = "";

    if (_id) {
      console.log("🚀 ~ file: product.js:34 ~ addProduct ~ _id:", _id);
      const updateData = {
        itemName,
        price,
        category,
        cuisine,
        isActive,
        remarks,
        hasPortions,
        portions,
        imageUrl,
      };
      savedProduct = await Product.findByIdAndUpdate(_id, updateData, {
        new: true,
      });
    } else {
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
      savedProduct = await newProduct.save();
    }
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

const deleteProductById = async (req, res) => {
  try {
    const _id = req.query.id;
    const data = await Product.findByIdAndDelete({ _id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error deleting products" });
  }
};

module.exports = { addProduct, getAllProducts, getProductById };
