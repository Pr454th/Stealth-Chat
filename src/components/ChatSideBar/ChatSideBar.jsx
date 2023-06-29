import { useRouter } from "next/navigation";
import React from "react";

export default function ChatSideBar({ users, title }) {
  const router = useRouter();

  const goToHome = () => {
    router.push("/chat");
  };

  const leaveChat = () => {
    localStorage.removeItem("userName");
    router.push("/chat");
  };

  return (
    <div className="bg-gray-800 text-white p-4 md:w-1/4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">
        {users.length === 1 && (
          <li className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 rounded-lg px-4 py-2">
            <div
              className={`w-8 h-8 bg-gray-500 rounded-full`}
              style={{ backgroundColor: "black" }}
            ></div>
            <span className="text-sm">{localStorage.getItem("userName")}</span>
          </li>
        )}
        {users.length > 1 &&
          users.map((user, index) => (
            <li
              key={index}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 rounded-lg px-4 py-2"
            >
              <div
                className={`w-8 h-8 bg-gray-500 rounded-full`}
                style={{ backgroundColor: user.color }}
              ></div>
              <span className="text-sm">{user.user}</span>
            </li>
          ))}
      </ul>
      <div className="flex-grow"></div>
      <div className="flex justify-between m-5">
        <button
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded"
          onClick={leaveChat}
        >
          Leave Chat
        </button>
        <button
          className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-green-600 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded"
          onClick={goToHome}
        >
          Home Page
        </button>
      </div>
    </div>
  );
}
