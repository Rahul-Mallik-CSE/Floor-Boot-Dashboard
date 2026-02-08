/** @format */ "use client";
import React from "react";
import { GreetingHeader } from "@/components/MyBusinessComponents/GreetingHeader";
import { ProfileSection } from "@/components/MyBusinessComponents/ProfileSection";
import { OrdersManagementCard } from "@/components/MyBusinessComponents/OrdersManagementCard";
import { useGetProfileQuery } from "@/redux/freatures/myBusinessAPI";
import { getFullImageUrl } from "@/lib/utils";

const MyBusinessPage = () => {
  const { data, isLoading, error } = useGetProfileQuery();

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="max-w-625 mx-auto px-2 md:px-4 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="border border-gray-300 p-2 md:p-4 rounded-2xl">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="max-w-625 mx-auto px-2 md:px-4 py-6">
          <p className="text-red-500">Failed to load profile data.</p>
        </div>
      </div>
    );
  }

  const profileData = data?.profile_data;
  const greeting = data?.message || "Hi, Good evening!";

  return (
    <div className="w-full">
      <div className="max-w-625 mx-auto px-2 md:px-4 py-6">
        <h1 className="text-black text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
          My Account
        </h1>
        <div className="max-w-6xl border border-gray-300 p-2 md:p-4 rounded-2xl">
          {/* Greeting Header */}
          <GreetingHeader greeting={greeting} />

          {/* Profile Section */}
          <ProfileSection
            name={profileData?.full_name || "N/A"}
            email={profileData?.email || "N/A"}
            avatar={
              profileData?.image
                ? getFullImageUrl(profileData.image)
                : undefined
            }
          />

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
