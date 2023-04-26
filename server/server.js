const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const Server = require("socket.io");
const { joinRoom, getAllUsers, leaveRoom, addUser } = require("./utils/user");

dotenv.config();

const app = express();
app.use(cors);
const server = http.createServer(app);
const io = Server(server);

io.on("connection", (socket) => {
  socket.emit("userId", socket.id);
  socket.on("register", ({ username }) => {
    addUser(socket.id, username);
    socket.emit("userId", socket.id);
    console.log(socket.id);
  });

  socket.on("join-room", ({ username, room }) => {
    // console.log(room);
    joinRoom(socket.id, username, room);
    socket.join(room);
  });

  socket.on("send-message", (message) => {
    // console.log(message.room);
    io.to(message.room).emit("message", message);
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
