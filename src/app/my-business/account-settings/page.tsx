/** @format */
"use client";
import React from "react";
import { GeneralSettingsSection } from "@/components/MyBusinessComponents/GeneralSettingsSection";
import { SecuritySettingsSection } from "@/components/MyBusinessComponents/SecuritySettingsSection";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/redux/freatures/myBusinessAPI";

const AccountSettingsPage = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetProfileQuery();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <div className="max-w-625 mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <div className="max-w-625 mx-auto px-4 md:px-6 py-6 md:py-8">
          <p className="text-red-500">Failed to load profile data.</p>
        </div>
      </div>
    );
  }

  const profileData = data?.profile_data;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-625 mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="cursor-pointer text-black text-2xl md:text-3xl font-semibold mb-6 md:mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-black text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
            Account Settings
          </h1>
        </div>

        {/* General section */}
        <GeneralSettingsSection profileData={profileData} />

        {/* Security Settings section */}
        <div className="mt-6">
          <SecuritySettingsSection />
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
