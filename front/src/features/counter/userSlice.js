import { createSlice } from "@reduxjs/toolkit";
import { socket as socketIO } from "../../services/socket";

const initialState = {
  userName: {},
  messages: [],
  rooms: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getRoomId: (state, action) => {
      state.rooms = { id: action.payload };
    },
    addUserName: (state, action) => {
      state.userName = action.payload.userName;
    },
    addMessage: (state, action) => {
      state.messages.push({
        roomId: action.payload.roomId,
        userName: state.userName,
        message: action.payload.message,
        time: action.payload.time,
      });
    },
  },
});

export const { getRoomId, addUserName, addMessage } = userSlice.actions;
export default userSlice.reducer;
