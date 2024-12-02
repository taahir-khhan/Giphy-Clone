import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import { useGifState } from "../context/GifContext";

function AppLayout() {
  const { message } = useGifState();
  return (
    <div className="bg-gray-900 text-white min-h-screen relative">
      {message.length > 0 && (
        <div className="fixed w-full z-10  left-0 top-0 py-2 text-center  font-bold gradient">
          {message}
        </div>
      )}
      <div className="px-6 py-4 mx-auto">
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
