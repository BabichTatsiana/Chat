import React, { useState } from "react";
import Room from "./containers/room";
import Messages from "./containers/messages";
import "./styles.scss";
import { useSelector } from "react-redux";

function App() {
  const roomId = useSelector((state) => state.user.rooms?.id);
  const [visibleWindow, setVisibleWindow] = useState(true);
  return (
    <div className="App">
      <Room />
      {roomId && visibleWindow && (
        <Messages setVisibleWindow={setVisibleWindow} />
      )}
      {!visibleWindow && (
        <button className="hide-button" onClick={(e) => setVisibleWindow(true)}>
          open
        </button>
      )}
    </div>
  );
}

export default App;
