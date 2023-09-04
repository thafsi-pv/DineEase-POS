const express = require("express");
const { createChat, getChats } = require("../controller/chat");

const chatRouter = express.Router();

chatRouter.post("/create", createChat);
chatRouter.post("/getChats", getChats);

module.exports = chatRouter;
