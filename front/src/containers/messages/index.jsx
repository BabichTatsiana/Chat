import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EVENTS, MESSAGES } from "../../constants";
import { addMessage } from "../../features/user/userSlice";
import { FullScreenIcon, MinScreenIcon } from "../../icons";
import {
  handleMouseDown,
  handleMouseLeave,
  handleMouseMove,
} from "../../services/resizing";
import {
  subscribeToSocketEvent,
  unsubscribeFromSocketEvent,
} from "../../services/socket";
import LangList from "./langList";
import NewMessageForm from "./newMessageForm";
import OneMessage from "./oneMessage";
import TabContainer from "./tabContainer";

const defaultChatWidth = 360;
const defaultChatHeight = 400;
const startXPosDrag = 0;
const startYPosDrag = 0;
const startWidthSize = 0;
const startHeightSize = 0;

const Messages = ({ setVisibleWindow }) => {
  const dispatch = useDispatch();
  const [allMessages, setAllMessages] = useState(MESSAGES);
  const [tab, setTab] = useState(0);
  const [isSubscribedToSocket, setSubscribedToSocket] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: defaultChatWidth,
    height: defaultChatHeight,
  });
  const [resizing, setResizing] = useState(false);
  const [startPos, setStartPos] = useState({
    x: startXPosDrag,
    y: startYPosDrag,
  });
  const [startSize, setStartSize] = useState({
    width: startWidthSize,
    height: startHeightSize,
  });

  const userName = useSelector((state) => state.user.userName);

  const refScroll = useRef();

  const myMessageCheck = (name) => {
    if (name === userName) return true;
    return false;
  };

  const handleMessagesUpdate = ({ roomId, message, userName, time, id }) => {
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
    if (!isSubscribedToSocket) {
      subscribeToSocketEvent(EVENTS.SERVER.ROOM_MESSAGE, handleMessagesUpdate);
      setSubscribedToSocket(true);
    }
    return () => {
      unsubscribeFromSocketEvent(
        EVENTS.SERVER.ROOM_MESSAGE,
        handleMessagesUpdate
      );
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
