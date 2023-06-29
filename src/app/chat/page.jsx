"use client";
import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ChatHomePage = () => {
  const router = useRouter();
  const [joinRoom, setJoinRoom] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  const chatCollectionRef = collection(db, "chat_messages");

  const handleJoinRoom = async () => {
    // Handle join room logic
    console.log("Joining room:", roomId, "as", userName);
    localStorage.setItem("userName", userName);
    try {
      const queryDb = query(chatCollectionRef, where("name", "==", roomId));
      const querySnapshot = await getDocs(queryDb);
      console.log(querySnapshot);
      if (querySnapshot.empty) {
        console.log("No such document");
      } else {
        console.log("Document data:", querySnapshot.docs[0].id);
        const docRef = doc(db, "chat_messages", querySnapshot.docs[0].id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, {
            users: [...docSnap.data().users, userName],
          });
          router.push(`/chat/${querySnapshot.docs[0].id}`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateRoom = async () => {
    // Handle create room logic
    console.log("Creating room:", roomId, "as", userName);
    try {
      const docRef = await addDoc(chatCollectionRef, {
        name: roomId,
        messages: [],
        users: [userName],
      });
      console.log("Document written with ID: ", docRef.id);
      localStorage.setItem("userName", userName);
      router.push(`/chat/${docRef.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h2 className="text-4xl font-bold text-gray-200 m-4">
        <span className="relative">
          <span className=" text-gray-900 underline dark:text-white decoration-indigo-500 ">
            Start the Anonymous Chat
          </span>
        </span>
      </h2>

      <div className="flex flex-col gap-4">
        <button
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-400 hover:to-indigo-800 text-white font-semibold py-2 px-4 rounded"
          onClick={() => {
            setCreateRoom(!createRoom);
            setJoinRoom(false);
          }}
        >
          {createRoom ? "Cancel" : "Create a Chat Room"}
        </button>
        {createRoom && (
          <div className="flex flex-col gap-2 border-solid border-2 border-sky-500 p-3 rounded-md">
            <input
              type="text"
              placeholder="Enter Room ID"
              className="bg-gray-800 text-white rounded px-4 py-2 outline-none hover:outline-none"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter User Name"
              className="bg-gray-800 text-white rounded px-4 py-2 mb-2"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <button
              className="m-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleCreateRoom}
            >
              Create
            </button>
          </div>
        )}

        <button
          className="bg-gradient-to-r from-pink-700 to-blue-900 hover:from-blue-600 hover:to-pink-800 text-white font-semibold py-2 px-4 rounded"
          onClick={() => {
            setJoinRoom(!joinRoom);
            setCreateRoom(false);
          }}
        >
          {joinRoom ? "Cancel" : "Join a Chat Room"}
        </button>

        {joinRoom && (
          <div className="flex flex-col gap-2 border-solid border-2 border-sky-500 p-3 rounded-md">
            <input
              type="text"
              placeholder="Enter Room ID"
              className="bg-gray-800 text-white rounded px-4 py-2 outline-none hover:outline-none"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter User Name"
              className="bg-gray-800 text-white rounded px-4 py-2 mb-2"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleJoinRoom}
            >
              Join
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHomePage;
