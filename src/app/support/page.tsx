/** @format */

import React, { Suspense } from "react";
import ChatLayout from "@/components/ChatComponents/ChatLayout";

const ChatPage = () => {
  return (
    <div className=" p-6 ">
      <div className="max-w-[2000px] mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Support</h1>

        <Suspense fallback={<div>Loading Support chat...</div>}>
          <ChatLayout />
        </Suspense>
      </div>
    </div>
  );
};

export default ChatPage;
