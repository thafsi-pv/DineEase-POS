const express = require("express");
const {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomerById,
  getCustomerByCategory,
} = require("../controller/customer");
const customerRouter = express.Router();

customerRouter.post("/create", addCustomer);
customerRouter.get("/getAllActiveCustomers", getAllCustomers);
customerRouter.get("/getCustomerById", getCustomerById);
customerRouter.delete("/deleteCustomerById", deleteCustomerById);
customerRouter.get("/getCustomerByCategory", getCustomerByCategory);

module.exports = customerRouter;
