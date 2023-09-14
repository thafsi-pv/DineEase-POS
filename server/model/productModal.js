const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  itemName: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Object,
    default: {},
  },
  cuisine: [
    {
      type: Object,
      default: {},
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  remarks: {
    type: String,
    default: "",
  },
  hasPortions: {
    type: Boolean,
    default: false,
  },
  portions: [
    {
      type: Object,
      default: {},
    },
  ],
  imageUrl: {
    type: String,
    default: "",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
