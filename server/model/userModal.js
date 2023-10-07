const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String },
    password: { type: String },
    mobile: { type: Number },
    address: { type: String },
    dob: { type: Date },
    alternateNo: { type: Number },
    imageUrl: { type: String },
    gender: { type: Object, default: {} },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("user", userSchema);
