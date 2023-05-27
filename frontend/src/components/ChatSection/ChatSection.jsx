import React from "react";
import Messages from "./Messages";
import Input from "./Input";
import "./ChatSection.css";
import { MoreVert } from "@mui/icons-material";
import { useSelector } from "react-redux";

const ChatSection = () => {
  const { user: thisUser, ChatId } = useSelector((state) => state.userChat);

  return (
    <div className="chatSection">
      <div className="top-user-info">
        <div className="user-info-left">
          <img
            src={thisUser.avatar}
            alt=""
          />
          <span>{thisUser.name}</span>
        </div>
        <div className="user-info-right">
          <MoreVert />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default ChatSection;
