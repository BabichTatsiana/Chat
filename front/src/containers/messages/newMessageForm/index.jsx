import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SmileIcon } from "../../../icons";
import { sendMessage } from "../../../services/socket";

const NewMessageForm = () => {
  const [message, setMessage] = useState("");
  const roomId = useSelector((state) => state.user.rooms?.id);
  const userName = useSelector((state) => state.user.userName);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage({ roomId, message, userName });
      setMessage("");
    }
  };

  return (
    <form className="form-input">
      <textarea
        onKeyDown={handleKeyDown}
        className="message-input"
        placeholder="Напишите сообщение..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <div>
        <SmileIcon className="icon" />
      </div>
    </form>
  );
};

export default NewMessageForm;
