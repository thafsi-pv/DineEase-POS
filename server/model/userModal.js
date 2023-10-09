const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String },
    password: { type: String },
    mobile: { type: Number },
    address: { type: String },
    dob: { type: Date, default: new Date() },
    alternateNo: { type: Number },
    imageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dm4djc1b1/image/upload/v1696873271/ymkpg1ig0htdxdi96aey.png",
    },
    gender: { type: Object, default: {} },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("user", userSchema);
