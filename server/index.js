const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const paymentRoutes = require("./router/payment");
const app = express();
const { authRouter } = require("./router/auth");
const connectDb = require("./config/db");

const socketIo = require("socket.io");
const http = require("http");
const { verifyToken } = require("./utils/jwt");
const server = http.createServer(app);
//const io = socketIo(server);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Configure CORS to allow requests from http://localhost:5173
app.use(cors({ origin: "http://localhost:5173" }));
dotenv.config();
app.use(express.json());
// app.use(cors());
connectDb();

app.use("/api/auth", authRouter);

app.use("/api/payment/", paymentRoutes);

//socket

const connectedUsers = [];
// const io = socketIo(server);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("login", async (username) => {
    console.log(
      "🚀 ~ file: index.js:36 ~ login-connectedUsers:",
      connectedUsers
    );

    const token = socket.handshake.query.token;
    const verify = verifyToken(token);
    const recipientIndex = connectedUsers.findIndex(
      (user) => user.username == username
    );

    console.log(
      "🚀 ~ file: index.js:53 ~ socket.on ~ recipientIndex:",
      recipientIndex
    );

    if (recipientIndex >= 0) {
      connectedUsers[recipientIndex].soketid = socket.id;
    } else {
      const user = { username, soketid: socket.id, userId: verify._id };
      console.log("🚀 ~ file: index.js:45 ~ socket.on ~ verify:", verify);
      connectedUsers.push(user);
    }

    io.emit("userList", connectedUsers);
  });

  socket.on("private message", ({ sender, recipient, message }) => {
    console.log(
      "🚀 ~ file: index.js:52 ~ socket.on ~ recipientusername:",
      recipient
    );
    const recipientdata = connectedUsers.find(
      (user) => user.username == recipient
    );
    console.log(
      "🚀 ~ file: index.js:53 ~ socket.on ~ recipient:",
      recipientdata
    );
    if (recipientdata) {
      socket.to(recipientdata.soketid).emit("private message", {
        //sender: socket.id,
        sender,
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
