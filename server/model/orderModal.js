const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      // required: true,
      unique: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          rquired: true,
        },
        portion: {
          type: String,
          // required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    totalTax: {
      type: Number,
      required: true,
    },
    paymentType: { type: String, required: true },
    transactionId: { type: String },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// Create a function to generate and increment the order number
orderSchema.statics.generateOrderNumber = async function () {
  const Order = this;
  const lastOrder = await Order.findOne({}, {}, { sort: { orderNumber: -1 } });

  if (lastOrder) {
    const lastOrderNumber = lastOrder.orderNumber;
    const parts = lastOrderNumber.split("-");
    const prefix = parts[0];
    let number = parseInt(parts[1]) + 1;
    const newOrderNumber = `${prefix}-${number.toString().padStart(5, "0")}`;
    return newOrderNumber;
  } else {
    // If no orders exist yet, start with "DE01-00001"
    return "DE01-00001";
  }
};

// Pre-save hook to set the orderNumber before saving a new order
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    this.orderNumber = await this.constructor.generateOrderNumber();
    console.log("🚀 ~ file: orderModal.js:81 ~ this.orderNumber:", this.orderNumber)
  }
  next();
});

// Create the Order model using the schema
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
