const userModal = require("../model/userModal");

const signUp = async (req, res) => {
  const data = req.body;
  const isExist = await userModal.findOne({ email: data.email });
  if (isExist) {
    return res
      .status(400)
      .json({ message: "This email id already registered, use anothe one!" });
  }
  const hash=
};
