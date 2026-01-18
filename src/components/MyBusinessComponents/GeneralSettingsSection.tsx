/** @format */

"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export const GeneralSettingsSection: React.FC = () => {
  const [formData, setFormData] = useState({
    brandName: "DMS Flooring Supply",
    businessEmail: "zesucaccessories@gmail.com",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log("Saving changes:", formData);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      {/* General Heading */}
      <h2 className="text-sm font-medium text-gray-700 mb-4 md:mb-6">
        General
      </h2>
      {/* Avatar */}
      <div className="relative">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-xl md:text-2xl overflow-hidden">
          <Image
            src={"/public/vercel.svg"}
            alt="Profile Avatar"
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 mt-6">
        {/* Brand Name */}
        <div>
          <label
            htmlFor="brandName"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Brand Name
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            value={formData.brandName}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm md:text-base"
            placeholder="Enter brand name"
          />
        </div>

        {/* Business Email */}
        <div>
          <label
            htmlFor="businessEmail"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Business Email
          </label>
          <input
            type="email"
            id="businessEmail"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm md:text-base"
            placeholder="Enter business email"
          />
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveChanges}
          className="px-6 py-2.5 text-sm font-medium bg-gray-100 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};
