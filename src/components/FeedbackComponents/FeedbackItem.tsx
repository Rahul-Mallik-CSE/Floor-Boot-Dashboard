/** @format */

import React from "react";
import { Feedback } from "@/types/AllTypes";

interface FeedbackItemProps {
  feedback: Feedback;
}

const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  return (
    <div className="flex items-start gap-3 md:gap-4 py-4 md:py-5 border-b border-gray-200 last:border-b-0">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          {feedback.avatar ? (
            <img
              src={feedback.avatar}
              alt={feedback.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-sm md:text-base font-medium">
              {feedback.name.charAt(0)}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1">
              {feedback.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed break-words">
              {feedback.message}
            </p>
          </div>

          {/* Product ID and Time - Mobile: Stack, Desktop: Right aligned */}
          <div className="flex flex-row md:flex-col items-start md:items-end gap-2 md:gap-1 flex-shrink-0 mt-1 md:mt-0">
            <span className="text-xs md:text-sm text-blue-600 font-medium">
              {feedback.productId}
            </span>
            <span className="text-xs text-gray-500">{feedback.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackItem;
