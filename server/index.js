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

dotenv.config();

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (msg) => {
    console.log("🚀 ~ file: index.js:20 ~ socket.on ~ msg:", msg);
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
