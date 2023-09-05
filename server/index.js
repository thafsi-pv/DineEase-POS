const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const paymentRoutes = require("./router/payment");
const app = express();
const { authRouter } = require("./router/auth");
const chatRouter = require("./router/chat");
const connectDb = require("./config/db");

//const socketIo = require("socket.io");
const http = require("http");
const { verifyToken } = require("./utils/jwt");
const userModal = require("./model/userModal");
const server = http.createServer(app);

app.use(cors({ origin: "http://localhost:5173" }));
dotenv.config();
app.use(express.json());
// app.use(cors());
connectDb();

app.use("/api/auth", authRouter);

app.use("/api/payment/", paymentRoutes);

app.use("/api/chat/", chatRouter);

//socket

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const connectedUsers = [];

io.on("connection", (socket) => {
  //console.log(`User connected: ${socket.id}`);

  socket.on("login", async (username) => {
    const token = socket.handshake.query.token;
    const verify = verifyToken(token);
    const recipientIndex = connectedUsers.findIndex(
      (user) => user.username == username
    );

    const userdata = await userModal.find({ email: username });

    if (recipientIndex >= 0) {
      connectedUsers[recipientIndex].soketid = socket.id;
    } else {
      const user = {
        firstName: userdata[0].firstName,
        lastName: userdata[0].lastName,
        username,
        soketid: socket.id,
        userId: verify._id,
      };
      connectedUsers.push(user);
    }
    io.emit("userList", connectedUsers);
  });

  socket.on("private message", ({ sender, recipient, message }) => {
    const recipientdata = connectedUsers.find(
      (user) => user.username == recipient
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
