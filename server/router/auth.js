const express = require("express");
const { signUp, signIn, unlockScreen } = require("../controller/auth");
const { checkAuth } = require("../middleware/checkAuth");

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/signIn", signIn);
authRouter.post("/unlock", checkAuth, unlockScreen);

module.exports = { authRouter };
