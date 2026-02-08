/** @format */

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useUpdateProfileMutation } from "@/redux/freatures/myBusinessAPI";
import { getFullImageUrl } from "@/lib/utils";
import { toast } from "react-toastify";

interface ProfileData {
  full_name: string;
  email: string;
  phone: string | null;
  image: string | null;
  latitude: string | null;
  longitude: string | null;
  country_or_region: string | null;
  address_line_i: string | null;
  address_line_ii: string | null;
  suburb: string | null;
  city: string | null;
  postal_code: string | null;
  state: string | null;
  delivery_instructions: string;
}

interface GeneralSettingsSectionProps {
  profileData?: ProfileData;
}

export const GeneralSettingsSection: React.FC<GeneralSettingsSectionProps> = ({
  profileData,
}) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    image: null as File | null,
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        full_name: profileData.full_name || "",
        email: profileData.email || "",
        image: null,
      });
    }
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updateData: any = {
        full_name: formData.full_name,
        email: formData.email,
      };

      if (formData.image) {
        // For file upload, we might need to handle it differently
        // Assuming the API accepts FormData for image
        const formDataToSend = new FormData();
        formDataToSend.append("full_name", formData.full_name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("image", formData.image);

        await updateProfile(formDataToSend).unwrap();
      } else {
        await updateProfile(updateData).unwrap();
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
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
          {formData.image ? (
            <Image
              src={URL.createObjectURL(formData.image)}
              alt="Profile Avatar Preview"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              unoptimized={true}
            />
          ) : profileData?.image ? (
            <Image
              src={getFullImageUrl(profileData.image)}
              alt="Profile Avatar"
              width={80}
              height={80}
              className="w-full h-full object-cover"
              unoptimized={true}
            />
          ) : (
            <span>{getInitials(profileData?.full_name || "N/A")}</span>
          )}
        </div>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <label
          htmlFor="image"
          className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-1 cursor-pointer hover:bg-indigo-700 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </label>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 mt-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm md:text-base"
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm md:text-base"
            placeholder="Enter email"
          />
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveChanges}
          disabled={isLoading}
          className="px-6 py-2.5 text-sm font-medium bg-gray-100 text-gray-800 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </div>
  );
};
