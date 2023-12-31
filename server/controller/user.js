const userModal = require("../model/userModal");

const updateProfile = async (req, res) => {
  try {
    const data = req.body;
    console.log("🚀 ~ file: auth.js:64 ~ updateProfile ~ data:", data);
    const userId = req.userId;
    console.log("🚀 ~ file: user.js:8 ~ updateProfile ~ userId:", userId)
    //const isUserExist = await userModal.findOne({ _id: userId });

    const updatedUser = await userModal.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });
    console.log(
      "🚀 ~ file: auth.js:71 ~ updateProfile ~ updatedUser:",
      updatedUser
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModal.find({ _id: userId });
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { updateProfile, getUserData };
