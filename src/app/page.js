"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/chat");
  }, []);
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <h1>Home Page</h1>
    </div>
  );
}
