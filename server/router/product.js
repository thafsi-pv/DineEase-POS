const express = require("express");
const { addProduct, getAllProducts } = require("../controller/product");
const productRouter = express.Router();

productRouter.post("/create", addProduct);
productRouter.post("/getAllActiveProducts", getAllProducts);

module.exports = productRouter;
