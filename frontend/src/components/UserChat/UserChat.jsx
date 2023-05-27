import React from "react";
import "./UserChat.css";
import Sidebar from "../Sidebar/Sidebar";
import ChatSection from "../ChatSection/ChatSection";

const UserChat = () => {
  return (
    <div className="userChatContainer">
      <div className="chatWrapper">
        <div className="top-bar">
          <Sidebar />
        </div>
        <div className="bottom-bar">
          <ChatSection />
        </div>
      </div>
    </div>
  );
};

export default UserChat;
