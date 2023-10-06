const express = require("express");
const { updateProfile, getUserData } = require("../controller/user");
const { checkAuth } = require("../middleware/checkAuth");

const userRouter = express.Router();

userRouter.post("/updateProfile", checkAuth, updateProfile);

userRouter.get("/getUserData", checkAuth, getUserData);

module.exports = userRouter;
