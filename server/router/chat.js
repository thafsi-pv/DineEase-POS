const express = require("express");
const createChat = require("../controller/chat");

const chatRouter = express.Router();

chatRouter.post("/create", createChat);

module.exports = chatRouter;
