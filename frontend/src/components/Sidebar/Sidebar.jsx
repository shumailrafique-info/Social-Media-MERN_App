import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user._id), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    user._id && getChats();
  }, [user._id]);

  const handleSelect = async (user, ChatId) => {
    await dispatch({ type: "changeUser", payload: { user, ChatId } });
    window.innerWidth < 800 && Navigate("/chat/with");
  };

  return (
    <div className="SidebarContainer">
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="SingleChat-user"
              key={chat[0]}
              onClick={async () => {
                await handleSelect(
                  chat[1].userInfo,
                  user._id > chat[1].userInfo._id
                    ? user._id + chat[1].userInfo._id
                    : chat[1].userInfo._id + user._id
                );
              }}
            >
              <img src={chat[1].userInfo.avatar} alt="" />
              <div className="Name-LastMessage">
                <span>{chat[1].userInfo.name}</span>
                <span className="message">{chat[1].lastMessage?.text}</span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Sidebar;
