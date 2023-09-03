const chatModal = require("../model/userModal");

const createChat = async (req, res) => {
  try {
    const data = req.body;
    console.log("🚀 ~ file: chat.js:6 ~ createChat ~ data:", data);

    const newChat = await chatModal.create({ data });
  } catch (error) {}
};

module.exports = { createChat };
