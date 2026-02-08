/** @format */
"use client";
import React from "react";
import { GeneralSettingsSection } from "@/components/MyBusinessComponents/GeneralSettingsSection";
import { SecuritySettingsSection } from "@/components/MyBusinessComponents/SecuritySettingsSection";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const AccountSettingsPage = () => {
  const router = useRouter();

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
        <GeneralSettingsSection />

        {/* Security Settings section */}
        <div className="mt-6">
          <SecuritySettingsSection />
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
