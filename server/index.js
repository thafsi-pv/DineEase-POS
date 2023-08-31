const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const paymentRoutes = require("./router/payment");
const app = express();
const { authRouter } = require("./router/auth");
const connectDb = require("./config/db");
const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app);

dotenv.config();

app.use(express.json());
app.use(cors());
connectDb();

app.use("/api/auth", authRouter);

app.use("/api/payment/", paymentRoutes);



//socket 

const io = socketIo(server);

const connectedUsers = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("login", (username) => {
    connectedUsers[username] = socket.id;
    io.emit("userList", Object.keys(connectedUsers));
  });

  socket.on("private message", ({ recipient, message }) => {
    const recipientSocketId = connectedUsers[recipient];
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("private message", {
        sender: socket.id,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    const username = Object.keys(connectedUsers).find(
      (key) => connectedUsers[key] === socket.id
    );
    if (username) {
      delete connectedUsers[username];
      io.emit("userList", Object.keys(connectedUsers));
    }
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on port ${port}...`));
