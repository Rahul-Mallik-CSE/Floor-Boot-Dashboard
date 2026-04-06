/** @format */

import React from "react";
import type { FeedbackItem } from "@/types/AllTypes";
import { getFullImageUrl } from "@/lib/utils";
import Image from "next/image";

interface FeedbackItemProps {
  feedback: FeedbackItem;
}

const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  const userName = feedback.user?.full_name?.trim() || "Unknown User";
  const avatarUrl = getFullImageUrl(feedback.user?.image || "");
  const feedbackDate = new Date(feedback.updated_at);
  const formattedDate = Number.isNaN(feedbackDate.getTime())
    ? "-"
    : feedbackDate.toLocaleDateString();

  return (
    <div className="flex items-start gap-3 md:gap-4 py-4 md:py-5 border-b border-gray-200 last:border-b-0">
      {/* Avatar */}
      <div className="shrink-0">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden relative">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={userName}
              fill
              className="w-full h-full object-cover rounded-full"
              unoptimized
            />
          ) : (
            <span className="text-white text-sm md:text-base font-medium">
              {userName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1">
              {userName}
            </h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed wrap-break-word">
              {feedback.custormer_feedback}
            </p>
          </div>

          {/* Time - Mobile: Stack, Desktop: Right aligned */}
          <div className="flex flex-row md:flex-col items-start md:items-end gap-2 md:gap-1 shrink-0 mt-1 md:mt-0">
            <span className="text-xs text-gray-500">{formattedDate}</span>
            <h1 className="font-semibold">Order ID: {feedback.id}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackItem;
