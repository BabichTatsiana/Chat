import { nanoid } from "nanoid";
import { EVENTS } from "./constants/index.js";

const rooms = {};

const socket = ({ io }) => {
  io.on(EVENTS.connection, (socket) => {
    // CREATE NEW ROOM
    socket.on(EVENTS.CLIENT.CREATE_ROOM, (roomName) => {
      const roomId = nanoid();
      rooms[roomId] = { name: roomName };
      socket.join(roomId);

      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

      socket.emit(EVENTS.SERVER.ROOMS, rooms);
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });
    // SEND A ROOM MESSAGE
    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ roomId, message, userName }) => {
        const date = new Date();
        io.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
          roomId,
          message,
          userName,
          time: `${date.getHours()}:${date.getMinutes()}`,
        });
      }
    );
    // USER JOIN A ROOM
    socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
      socket.join(roomId);

      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });
  });
};
export default socket;
