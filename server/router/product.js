const express = require("express");
const { addProduct, getAllProducts } = require("../controller/product");
const productRouter = express.Router();

productRouter.post("/create", addProduct);
productRouter.get("/getAllActiveProducts", getAllProducts);

module.exports = productRouter;
