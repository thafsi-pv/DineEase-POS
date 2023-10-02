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
const productRouter = require("./router/product");
const customerRouter = require("./router/customer");
const orderRouter = require("./router/order");
const server = http.createServer(app);

app.use(cors({ origin: "*" }));
dotenv.config();
app.use(express.json());
connectDb();

app.use("/api/auth", authRouter);

app.use("/api/payment/", paymentRoutes);

app.use("/api/chat/", chatRouter);

app.use("/api/product", productRouter);

app.use("/api/customer", customerRouter);

app.use("/api/order", orderRouter);

//socket
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const connectedUsers = [];
var allUsersList = [];
io.on("connection", (socket) => {
  //console.log(`User connected: ${socket.id}`);

  socket.on("login", async (username) => {
    console.log("🚀 ~ file: index.js:42 ~ socket.on ~ username:", username);
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
    // io.emit("userList", connectedUsers);

    const allUsers = await userModal
      .find()
      .select("-password -tandc -createdAt -updatedAt -__v")
      .lean();

    if (allUsersList.length == 0) {
      allUsersList = allUsers.map((user) => {
        if (user.email === username) {
          user.soketid = socket.id;
          user.userId = verify._id;
          user.isOnline = true;
          user.username = username;
        }
        return user; // Always return the user object, whether it's updated or not
      });
    } else {
      const index = allUsersList.findIndex((user) => user.email === username);
      console.log("🚀 ~ file: index.js:80 ~ socket.on ~ index:", index);

      if (index != -1) {
        allUsersList[index].soketid = socket.id;
        allUsersList[index].isOnline = true;
        allUsersList[index].username = username;
        allUsersList[index].userId = verify._id;
      }
    }

    console.log("🚀 ~ file: index.js:63 ~ socket.on ~ allUsers:", allUsersList);
    io.emit("userList", allUsersList);
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
