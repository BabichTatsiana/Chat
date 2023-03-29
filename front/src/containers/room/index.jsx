import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { EVENTS, GENERAL, USERNAME } from "../../constants";
import { addUserName, getRoomId } from "../../features/counter/userSlice";
import {
  emitData,
  joinRoom,
  subscribeToSocketEvent,
} from "../../services/socket";

const Room = () => {
  const [userName, setUserName] = useState(USERNAME);
  const [roomConnected, setRoomConnected] = useState(null);
  const [joinedRoom, setJoinedRoom] = useState("");
  const dispatch = useDispatch();
  const handleDataUpdate = (newData) => {
    setRoomConnected(newData);
    dispatch(getRoomId(newData));
  };

  const handleClick = () => {
    emitData(GENERAL);
    dispatch(addUserName({ userName }));
  };

  const handleJoin = () => {
    dispatch(addUserName({ userName }));
    joinRoom(joinedRoom.trim());
  };

  useEffect(() => {
    subscribeToSocketEvent(EVENTS.SERVER.JOINED_ROOM, handleDataUpdate);
  }, []);

  return (
    <div className="room-container">
      <input
        className="room-connect-input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <button className="room-add-button" onClick={handleClick}>
        Create a chat
      </button>
      <div className="flex-center">
        <input
          className="room-connect-input"
          placeholder="Enter an exicting room id to join"
          value={joinedRoom}
          onChange={(e) => setJoinedRoom(e.target.value)}
        ></input>
        <button
          className="room-join-button"
          disabled={joinedRoom === roomConnected}
          onClick={handleJoin}
        >
          JOIN
        </button>
      </div>

      {!!roomConnected && <p>room Connected id: {roomConnected}</p>}
    </div>
  );
};

export default Room;
