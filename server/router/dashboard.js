const express = require("express");
const { getMonthlySalesAmounts } = require("../controller/dashboard");

const dashboardRouter = express.Router();

dashboardRouter.get("/monthlySales", getMonthlySalesAmounts);

module.exports = dashboardRouter;
