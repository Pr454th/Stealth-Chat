"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const redirectToChat = () => {
    router.push("/chat");
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-16 px-4 md:px-10 lg:px-20">
        <div className="flex flex-col justify-center bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-5xl font-extrabold text-gray-500 mb-6">
            <span className="text-blue-500">Stealth</span> Chat
          </h1>
          <p className="text-gray-500 text-lg mb-10">Anonymous Group Chat</p>
          <div className="text-gray-200">
            <p className="mb-4">
              Welcome to Stealth Chat, an anonymous group chat platform where
              you can connect and chat with people from all around the world
              without the need to log in or reveal your identity.
            </p>
            <p className="mb-4">
              Share your thoughts, ideas, and experiences while maintaining
              complete privacy. Engage in meaningful conversations with
              like-minded individuals or explore diverse perspectives.
            </p>
            <p className="mb-4">With Stealth Chat, you can:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Join multiple chat rooms on various topics</li>
              <li>Send text messages, emojis, and images</li>
              <li>Participate in real-time group discussions</li>
              <li>Stay anonymous and protect your privacy</li>
              <li>
                Connect with people from different backgrounds and cultures
              </li>
            </ul>
            <p className="mb-10">
              Start your anonymous chatting experience today and be part of the
              Stealth Chat community.
            </p>
            <button
              className="bg-gradient-to-r from-pink-700 to-blue-900 hover:from-blue-600 hover:to-pink-800 text-white font-semibold py-2 px-4 rounded"
              onClick={redirectToChat}
            >
              Start Chatting
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <Image
            className="max-w-full h-auto shadow-lg rounded-lg"
            src="https://images.pexels.com/photos/1703314/pexels-photo-1703314.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Group Chat Illustration"
            width={600}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
