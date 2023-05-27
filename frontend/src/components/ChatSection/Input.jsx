import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
import { useAlert } from "react-alert";

const Input = () => {
  const [text, setText] = useState("");
  const Alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { user: thisUser, ChatId } = useSelector((state) => state.userChat);

  const handleSend = async () => {
    // if ("image") {
    //   //   const storageRef = ref(storage, uuid());
    //   //   await uploadBytesResumable(storageRef, image).then(() => {
    //   //     getDownloadURL(storageRef).then(async (downloadURL) => {
    //   //       try {
    //   //         await updateDoc(doc(db, "chats", data.chatId), {
    //   //           messages: arrayUnion({
    //   //             id: uuid(),
    //   //             text,
    //   //             senderId: currentUser.uid,
    //   //             date: Timestamp.now(),
    //   //             image: downloadURL,
    //   //           }),
    //   //         });
    //   //       } catch (err) {
    //   //         console.log(err);
    //   //       }
    //   //     });
    //   //   });
    // } else {

    // }
    if (text === "") {
      return Alert.error("can't send empty Message");
    }
    await updateDoc(doc(db, "chats", ChatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: user._id,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChats", user._id), {
      [ChatId + ".lastMessage"]: {
        text,
      },
      [ChatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", thisUser._id), {
      [ChatId + ".lastMessage"]: {
        text,
      },
      [ChatId + ".date"]: serverTimestamp(),
    });

    setText("");
  };

  return (
    <div className="send-input-box">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Type Something....."
      />
      <div className="send">
        <input hidden={true} type="file" id="file" />
        <button
          disabled={ChatId === "null" ? true : false}
          onClick={handleSend}
        >
          {" "}
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
