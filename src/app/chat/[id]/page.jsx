"use client";
import ChatSideBar from "@/components/ChatSideBar/ChatSideBar";
import { db } from "@/config/firebase";
import {
  Timestamp,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";

export default function Chat({ params }) {
  const chatRef = useRef(null);

  const [chats, setChats] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const userName = localStorage.getItem("userName");
  const [userColors, setUserColors] = useState([{}]);

  const { id } = params;
  const chatCollectionRef = collection(db, "chat_messages");
  const chatDocRef = doc(db, "chat_messages", id);

  const generateRandomColor = () => {
    const randomR = Math.floor(Math.random() * 128) + 64;
    const randomG = Math.floor(Math.random() * 128) + 64;
    const randomB = Math.floor(Math.random() * 128) + 64;

    return `rgb(${randomR}, ${randomG}, ${randomB})`;
  };

  useEffect(() => {
    console.log(userColors);
  }, [userColors]);

  useEffect(() => {
    const unsubscribe = onSnapshot(chatDocRef, (snapshot) => {
      //getting single document
      const data = snapshot.data();
      setTitle(data.name);
      setChats(data.messages);
      const users = new Set(data.users);
      let uc = [];
      console.log(users.size);
      console.log(userColors.length);
      console.log(users);
      console.log(userColors);
      if (users.size === userColors.length) return;
      users.forEach((user) => {
        let color = generateRandomColor();
        let temp = { color: color, user: user };
        uc.push(temp);
      });
      setUserColors(uc);

      //getting every document
      // const chatCollectionRef = collection(db, "chat_messages");
      // const data = snapshot.docs.map((doc) => ({
      //   id: doc.id,
      //   ...doc.data(),
      // }));
      // setChats(data[0].messages);
      // setChatId(data[0].id);
      // console.log(data);
    });
    return () => unsubscribe();
  }, [userColors]);

  const formatDate = (date) => {
    const formattedTime = date?.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedTime;
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chats]);

  //Sending message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message === "") return;
    const newMessage = {
      user: userName,
      message,
      timestamp: Timestamp.fromDate(new Date()),
    };
    try {
      await updateDoc(doc(db, "chat_messages", id), {
        messages: [...chats, newMessage],
      });
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <ChatSideBar users={userColors} title={title} />
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 md:flex-1 md:min-h-screen relative overflow-y-scroll">
        <div className="flex-grow space-y-4 min-h-full">
          {chats.map((chat, index) => {
            const userColor = userColors.find(
              (color) => color.user === chat.user
            );

            // Set a default color if the user's color is not found
            const backgroundColor = userColor ? userColor.color : "#000000";
            return (
              <div
                key={index}
                className={`${
                  chat.user === userName
                    ? "flex justify-end"
                    : "flex justify-start"
                }`}
              >
                <div
                  className={`${
                    chat.user === userName
                      ? "bg-blue-500 rounded-bl-lg"
                      : "bg-green-500 rounded-br-lg"
                  } rounded-t-lg px-4 py-2 text-white`}
                  style={{ backgroundColor }}
                >
                  <div className="text-xs font-bold">{chat.user}</div>
                  <div>{chat.message}</div>
                  <div className="text-xs float-right">
                    {formatDate(chat.timestamp?.toDate())}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div ref={chatRef} />

        {/* Messaging Section */}
        <div className="sticky bottom-0 left-0 w-full p-4">
          <form
            onSubmit={handleSendMessage}
            className="flex dark:bg-gray-800 rounded-lg overflow-hidden"
          >
            <input
              type="text"
              placeholder="Type a message..."
              className="px-4 py-2 bg-transparent outline-none dark:text-white w-full"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="ml-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white p-2 m-2"
              type="submit"
            >
              <AiOutlineSend size={25} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
