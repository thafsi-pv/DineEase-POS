const chatModal = require("../model/userModal");

const createChat = async (req, res) => {
  try {
    const data = req.body;
    console.log("🚀 ~ file: chat.js:6 ~ createChat ~ data:", data);

    const newChat = await chatModal.create({ data });
    res.status(200).json({ message: "saved successfully" });
  } catch (error) {
    res.status(400).json({ message: "error occured" });
  }
};

module.exports = { createChat };
