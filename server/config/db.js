const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const { connetion } = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected at host:" + connection.host);
  } catch (error) {
    console.log("🚀 ~ file: db.js:8 ~ connectDb ~ error:", error);
  }
};

module.exports = connectDb;
