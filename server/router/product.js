const express = require("express");
const { addProduct } = require("../controller/product");
const productRouter = express.Router();

productRouter.post("/create", addProduct);

module.exports = productRouter;
