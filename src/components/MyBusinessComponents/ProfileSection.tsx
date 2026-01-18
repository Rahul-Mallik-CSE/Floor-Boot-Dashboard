/** @format */

"use client";

import React, { useState } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";

interface ProfileSectionProps {
  name: string;
  email: string;
  avatar?: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  name,
  email,
  avatar,
}) => {
  return (
    <div className="">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-xl md:text-2xl overflow-hidden">
            <Image
              src={avatar || ""}
              alt={name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name and Email */}
        <div className="flex-1">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            {name}
          </h2>
          <p className="text-sm md:text-base text-gray-500">{email}</p>
        </div>
      </div>
    </div>
  );
};
