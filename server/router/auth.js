const express = require("express");
const {
  signUp,
  signIn,
  unlockScreen,
  updateProfile,
} = require("../controller/auth");
const { checkAuth } = require("../middleware/checkAuth");

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/signIn", signIn);
authRouter.post("/unlock", checkAuth, unlockScreen);
authRouter.post("/updateProfile", checkAuth, updateProfile);

module.exports = { authRouter };
