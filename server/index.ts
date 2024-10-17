const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

var io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: any) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data: any) => {
    console.log(data)
    socket.broadcast.emit("receive_message", data); 
  });
});

server.listen(8080, () => {
  console.log("SERVER IS RUNNING");
});