import React, { useContext, useEffect, useRef } from "react";
import "./Message.css";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const ref = useRef();
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { user: thisUser, ChatId } = useSelector((state) => state.userChat);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message  ${message.senderId === user._id ? "owner" : ""}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === user._id ? user.avatar.url : thisUser.avatar
          }
          alt="User"
        />
        <span>{message.date.toDate().toLocaleTimeString()}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.image && <img src={message.image} alt="Img" />}
      </div>
    </div>
  );
};

export default Message;
