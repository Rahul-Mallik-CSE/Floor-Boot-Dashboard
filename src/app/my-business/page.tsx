/** @format */

import React from "react";
import { GreetingHeader } from "@/components/MyBusinessComponents/GreetingHeader";
import { ProfileSection } from "@/components/MyBusinessComponents/ProfileSection";
import { OrdersManagementCard } from "@/components/MyBusinessComponents/OrdersManagementCard";

const MyBusinessPage = () => {
  return (
    <div className="w-full  ">
      <div className="max-w-625 mx-auto px-2 md:px-4 py-6 ">
        <h1 className="text-black text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
          My Account
        </h1>
        <div className="max-w-6xl border border-gray-300 p-2 md:p-4 rounded-2xl">
          {/* Greeting Header */}
          <GreetingHeader greeting="Hi, Good evening!" />

          {/* Profile Section */}
          <ProfileSection name="DMS" email="dms@example.com" />

          {/* Orders Management */}
          <div className="mt-4 md:mt-6">
            <OrdersManagementCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBusinessPage;
