const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:5173",
  },
});

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
