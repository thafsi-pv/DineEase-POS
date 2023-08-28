const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const paymentRoutes = require("./router/payment");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const { authRouter } = require("./router/auth");
const server = http.createServer(app);
const io = socketIo(server);
const connectDb = require("./config/db");

dotenv.config();

app.use(express.json());
app.use(cors());
connectDb();

const connectedUsers = {};
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Store user's socket ID
  socket.on("login", (username) => {
    connectedUsers[username] = socket.id;
  });

  socket.on("connected UsersList", () => {
    console.log("🚀 ~ file: index.js:31 ~ socket.on ~ connectedUserslist:", connectedUsers)
    io.emit("connectedUsers", Object.values(connectedUsers));
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use("/api/auth", authRouter);

app.use("/api/payment/", paymentRoutes);

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on port ${port}...`));
