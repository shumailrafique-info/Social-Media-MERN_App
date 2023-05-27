import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { user: thisUser, ChatId } = useSelector((state) => state.userChat);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", ChatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [ChatId, thisUser]);

  return (
    <div className="Messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
