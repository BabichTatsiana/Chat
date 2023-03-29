import http from "http";
import express from "express";
import { Server } from "socket.io";
import socket from "./socket.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.static("public"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connect", (socket) => {
  socket.on("connect user", ({ id }) => {
    socket.emit("all online users", { users });
    socket.broadcast.emit("all online users", { users });
  });

  socket.on(
    "join to room",
    ({ newUser, room, isPersonalChat = false }, callback) => {
      // const { error, user } = addUser({
      //   id: newUser.id,
      //   userName: newUser.name,
      //   room,
      //   sockId: socket.id,
      //   isPersonalChat,
      // });
      // if (error) return;

      socket.join(user.room);

      if (!isPersonalChat) {
        socket.emit("message", {
          user: "admin",
          text: `${user.userName}, welcome to room ${user.room}.`,
        });
        socket.broadcast.to(user.room).emit("message", {
          user: "admin",
          text: `${user.userName} has joined!`,
        });
      }

      io.to(user.room).emit("roomData", {
        room: user.room,
        usersInRoom: getUsersInRoom(user.room),
      });

      callback();
    }
  );
});

const start = async () => {
  try {
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server has started`);
      socket({ io });
    });
  } catch (e) {
    console.log(e);
  }
};

start();
