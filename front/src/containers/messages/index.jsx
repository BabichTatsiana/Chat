import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EVENTS, MESSAGES, USERNAME } from "../../constants";
import { addMessage } from "../../features/counter/userSlice";
import { FullScreenIcon, MinScreenIcon } from "../../icons";
import {
  handleMouseDown,
  handleMouseLeave,
  handleMouseMove,
  handleMouseUp,
} from "../../services/resizing";
import {
  subscribeToSocketEvent,
  unsubscribeFromSocketEvent,
} from "../../services/socket";
import LangList from "./langList";
import NewMessageForm from "./newMessageForm";
import OneMessage from "./oneMessage";
import TabContainer from "./tabContainer";

const Messages = ({ setVisibleWindow }) => {
  const dispatch = useDispatch();
  const [allMessages, setAllMessages] = useState(MESSAGES);
  const [tab, setTab] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 360, height: 400 });
  const [resizing, setResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });

  const userName = useSelector((state) => state.user.userName);

  const refScroll = useRef();

  const myMessageCheck = (name) => {
    if (name === userName) return true;
    return false;
  };

  const handleDataUpdate = ({ roomId, message, userName, time, id }) => {
    setAllMessages((prevMessages) => {
      const isDuplicate = prevMessages.some(
        (prevMessage) => prevMessage.id === id
      );
      if (!isDuplicate) {
        return [...prevMessages, { message, userName, time, id }];
      }
      return prevMessages;
    });

    dispatch(addMessage({ roomId, message, userName, time }));
  };

  useEffect(() => {
    if (!isSubscribed) {
      subscribeToSocketEvent(EVENTS.SERVER.ROOM_MESSAGE, handleDataUpdate);
      setIsSubscribed(true);
    }
    return () => {
      unsubscribeFromSocketEvent(EVENTS.SERVER.ROOM_MESSAGE, handleDataUpdate);
    };
  }, []);

  useEffect(() => {
    if (refScroll.current) {
      refScroll.current.scrollTop = refScroll.current.scrollHeight;
    }
  }, [allMessages, tab]);

  return (
    <div
      className="room-wrapper"
      style={{ width: windowSize.width, height: windowSize.height }}
      onMouseMove={(e) =>
        handleMouseMove(e, resizing, startPos, startSize, setWindowSize)
      }
      onMouseUp={(e) => setResizing(false)}
      onMouseLeave={(e) => handleMouseLeave(e, resizing, setResizing)}
    >
      <div className="tab">
        <TabContainer tab={tab} setTab={setTab} />
        <LangList />
        <div className="flex-center m-5 icon icon">
          <FullScreenIcon
            onMouseDown={(e) =>
              handleMouseDown(
                e,
                setResizing,
                setStartPos,
                setStartSize,
                windowSize
              )
            }
          />
        </div>
        <div className="flex-center m-5 icon">
          <MinScreenIcon onClick={(e) => setVisibleWindow(false)} />
        </div>
      </div>
      {allMessages?.length === 0 || tab !== 0 ? (
        <div className="all-messages-wrapper"></div>
      ) : (
        <div className="all-messages-wrapper" ref={refScroll}>
          {allMessages?.map((mess, i) => {
            return (
              <div
                key={i}
                className={
                  myMessageCheck(mess?.userName)
                    ? "message-container my-message-container"
                    : "message-container "
                }
              >
                <OneMessage
                  mess={mess}
                  myMessage={myMessageCheck(mess?.userName)}
                />
              </div>
            );
          })}
        </div>
      )}
      <NewMessageForm />
    </div>
  );
};

export default Messages;
