const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const Server = require("socket.io");
const { joinRoom, getAllUsers, leaveRoom } = require("./utils/user");

dotenv.config();

const app = express();
app.use(cors);
const server = http.createServer(app);
const io = Server(server);

io.on("connection", (socket) => {
  socket.emit("userId", socket.id);

  socket.on("join-room", ({ username, room }) => {
    joinRoom(socket.id, username, room);
  });

  socket.on("send-message", (message) => {
    io.emit("message", message);
  });

  socket.on("get-all-users", () => {
    const users = getAllUsers();
    io.emit("users", users);
  });

  socket.on("leave-room", ({ username, room }) => {
    leaveRoom(username, room);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server start on port ${process.env.PORT}`);
});
