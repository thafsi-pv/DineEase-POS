const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductById,
} = require("../controller/product");
const productRouter = express.Router();

productRouter.post("/create", addProduct);
productRouter.get("/getAllActiveProducts", getAllProducts);
productRouter.get("/getProductById", getProductById);

module.exports = productRouter;
