const mongoose = require("mongoose");
const userModal = require("./userModal");

const chatSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: user },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: user },
    message: { type: String },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("chats", chatSchema);
