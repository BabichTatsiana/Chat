import io from "socket.io-client";
import { API_ENDPOINT, EVENTS } from "../../constants";

export const socket = io(API_ENDPOINT);

export const subscribeToSocketEvent = (eventName, callback) => {
  socket.on(eventName, (data) => {
    callback(data);
  });
};

export const unsubscribeFromSocketEvent = (eventName, callback) => {
  socket.off(eventName, callback);
};

export const newRoom = (data) => {
  socket.emit(EVENTS.CLIENT.CREATE_ROOM, data);
  socket.on(EVENTS.SERVER.JOINED_ROOM, data);
};

export const sendMessage = (message) => {
  socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, message);
  socket.on(EVENTS.SERVER.ROOM_MESSAGE, message);
};

export const joinRoom = (joinedRoom) => {
  socket.emit(EVENTS.CLIENT.JOIN_ROOM, joinedRoom);
};
