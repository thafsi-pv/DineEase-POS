const userModal = require("../model/userModal");
const { generateHashPassword, comparePassword } = require("../utils/bcrypt");
const { generateJWTToken } = require("../utils/jwt");

const signUp = async (req, res) => {
  try {
    const data = req.body;
    console.log("🚀 ~ file: auth.js:7 ~ signUp ~ data:", data);
    const isExist = await userModal.findOne({ email: data.email });
    if (isExist) {
      return res.status(400).json({
        message: "This email id already registered, use another one!",
      });
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

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await userModal.findOne({ email });
    if (!isUserExist) {
      return res.status(400).json({ message: "Incorrect email/password" });
    }

    const validPassword = await comparePassword(password, isUserExist.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect email/password" });
    }

    //generate access token
    const accesstoken = generateJWTToken(isUserExist._id);
    return res.status(200).json({
      message: "Login success",
      accesstoken,
      email: isUserExist.email,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const unlockScreen = async (req, res) => {
  const data = req.body;
  console.log("🚀 ~ file: auth.js:52 ~ unlockScreen ~ data:", data);
  const { password } = data;
  const userId = req.userId;
  const isUserExist = await userModal.findOne({ _id: userId });

  const validPassword = await comparePassword(password, isUserExist.password);
  if (!validPassword) res.status(400).json({ message: "Incorrect password" });
  else res.status(200).json({ message: "Unlocked successfully" });
};

module.exports = { signUp, signIn, unlockScreen };
