import React, { useMemo } from "react";
import {
  AdaIcon,
  AdminIcon,
  BtcIcon,
  ModeratorIcon,
} from "../../../icons/index.jsx";
import { getRandomInt } from "../../../services/randomInt/index.js";

const OneMessage = ({ mess, myMessage }) => {
  const pointCount = useMemo(() => getRandomInt(), []);
  const iconRender = (mess) => {
    if (mess.icon === "m") return <BtcIcon />;
    else if (mess.icon === "k") return <AdaIcon />;
  };
  const statusRender = (mess) => {
    if (mess.status === "admin") return <AdminIcon />;
    else if (mess.status === "moderator") return <ModeratorIcon />;
  };
  return (
    <div
      className={myMessage ? "message-item my-message-item" : "message-item"}
    >
      {!myMessage && (
        <div className="message-info-user">
          {iconRender(mess)}
          <p className="message-item-username">{mess?.userName}</p>
          {statusRender(mess)}
          <span className="point-count">{pointCount}</span>
        </div>
      )}
      <p className="message-text">{mess?.message}</p>
      <p
        className={myMessage ? "message-time my-message-time" : "message-time "}
      >
        {mess?.time}
      </p>
    </div>
  );
};

export default OneMessage;
