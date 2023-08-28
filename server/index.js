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

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("userList", () => {
    io.emit("userList", connectedUsers);
  });

  socket.on("private message", ({ recipient, message }) => {
    console.log("🚀 ~ file: index.js:46 ~ socket.on ~ recipient:", recipient);
    console.log("🚀 ~ file: index.js:47 ~ socket.on ~ message:", message);

    console.log(
      "🚀 ~ file: index.js:41 ~ socket.on ~ connectedUsers:",
      connectedUsers
    );
    const recipientSocketId = connectedUsers[recipient];
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit("private message", {
        sender: socket.id,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use("/api/auth", authRouter);

app.use("/api/payment/", paymentRoutes);

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on port ${port}...`));
