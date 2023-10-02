const express = require("express");
const { createOrder } = require("../controller/order");

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);

module.exports = orderRouter;
