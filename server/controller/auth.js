const userModal = require("../model/userModal");
const { generateHashPassword } = require("../utils/bcrypt");

const signUp = async (req, res) => {
  try {
    const data = req.body;
    const isExist = await userModal.findOne({ email: data.email });
    if (isExist) {
      return res
        .status(400)
        .json({ message: "This email id already registered, use anothe one!" });
    }
    const hash = await generateHashPassword(data.password);
    const newUser = await userModal.create({ ...data, password: hash });
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signUp };
