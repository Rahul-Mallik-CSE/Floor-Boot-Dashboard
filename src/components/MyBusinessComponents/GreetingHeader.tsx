/** @format */

"use client";

import React from "react";
import { Settings } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface GreetingHeaderProps {
  greeting?: string;
}

export const GreetingHeader: React.FC<GreetingHeaderProps> = ({
  greeting = "Hi, Good evening!",
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-4 md:mb-6">
      <p className="text-sm md:text-base text-gray-600">{greeting}</p>
      <Button
        className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Settings"
        onClick={() => {
          router.push("/my-business/account-settings");
        }}
      >
        <Settings className="w-5 h-5 text-gray-600" />
      </Button>
    </div>
  );
};
