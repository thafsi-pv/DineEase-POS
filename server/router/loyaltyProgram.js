const express = require("express");
const { getTotalPointsByCustomerId } = require("../controller/loyaltyProgram");

const loyaltyRouter = express.Router();

loyaltyRouter.get("/pointsByCustomerId", getTotalPointsByCustomerId);

module.exports = loyaltyRouter;
