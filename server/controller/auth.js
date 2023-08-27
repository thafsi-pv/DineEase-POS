const userModal = require("../model/userModal");
const { generateHashPassword } = require("../utils/bcrypt");

const signUp = async (req, res) => {
  try {
    const data = req.body;
    console.log("🚀 ~ file: auth.js:7 ~ signUp ~ data:", data);
    const isExist = await userModal.findOne({ email: data.email });
    if (isExist) {
      return res
        .status(400)
        .json({ message: "This email id already registered, use anothe one!" });
    }
    const hash = await generateHashPassword(data.password);
    delete data.cpassword;
    const newUser = await userModal.create({ ...data, password: hash });
    console.log("🚀 ~ file: auth.js:16 ~ signUp ~ newUser:", newUser);
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signUp };
