const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  getProductByCategory,
} = require("../controller/product");
const productRouter = express.Router();

productRouter.post("/create", addProduct);
productRouter.get("/getAllActiveProducts", getAllProducts);
productRouter.get("/getProductById", getProductById);
productRouter.delete("/deleteProductById", deleteProductById);
productRouter.get("/getProductByCategory", getProductByCategory);

module.exports = productRouter;
