const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const Server = require("socket.io");

dotenv.config();

const app = express();
app.use(cors);
const server = http.createServer(app);
const io = Server(server);

io.on("connection", (socket) => {
  socket.emit("userId", socket.id);
  socket.on("send message", (message) => {
    io.emit("message", message);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server start on port ${process.env.PORT}`);
});
