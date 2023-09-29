const Customer = require("../model/customerModal");
const mongoose = require("mongoose");

async function addCustomer(req, res) {
  try {
    const {
      _id,
      firstName,
      lastName,
      email,
      mobile,
      isActive,
      loyaltyCard,
      address,
    } = req.body;
    console.log("🚀 ~ file: customer.js:17 ~ addCustomer ~ req.body:", req.body);

    let savedCustomer = "";

    if (_id) {
      console.log("🚀 ~ file: customer.js:34 ~ addCustomer ~ _id:", _id);
      const updateData = {
        firstName,
        lastName,
        email,
        mobile,
        isActive,
        loyaltyCard,
        address,
      };
      savedCustomer = await Customer.findByIdAndUpdate(_id, updateData, {
        new: true,
      });
    } else {
      const newCustomer = new Customer({
        firstName,
        lastName,
        email,
        mobile,
        isActive,
        loyaltyCard,
        address,
      });
      savedCustomer = await newCustomer.save();
    }
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ error: "Error adding the customer" });
  }
}

const getAllCustomers = async (req, res) => {
  try {
    const isActive = req.query.active;
    let customers;
    if (isActive === "true") {
      customers = await Customer.find({ isActive: true });
    } else if (isActive === "false") {
      customers = await Customer.find({ isActive: false });
    } else {
      // If no value provided or any other value, fetch all customers
      customers = await Customer.find();
    }
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching customers" });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const _id = req.query.id;
    const customer = await Customer.find({ _id });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: "Error fetching customers" });
  }
};

const deleteCustomerById = async (req, res) => {
  try {
    const _id = req.query.id;
    const data = await Customer.findByIdAndDelete({ _id });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error deleting customers" });
  }
};

const getCustomerByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const data = await Customer.find({
      "category.value": category,
      isActive: true,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching data" });
  }
};

module.exports = {
  addCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomerById,
  getCustomerByCategory,
};
