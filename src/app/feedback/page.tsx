/** @format */

"use client";

import FeedbackList from "@/components/FeedbackComponents/FeedbackList";
import { useGetFeedbacksQuery } from "@/redux/freatures/feedbackAPI";
import React from "react";

const FeedbackPage = () => {
  const { data, isLoading, error } = useGetFeedbacksQuery();

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="max-w-625 mx-auto px-2 md:px-4 py-6">
          <h1 className="text-black text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
            Buyers Feedback
          </h1>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
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
          <h1 className="text-black text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
            Buyers Feedback
          </h1>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-red-500">
              Failed to load feedback data. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-625 mx-auto px-2 md:px-4 py-6">
        <h1 className="text-black text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
          Buyers Feedback
        </h1>
        {data && <FeedbackList feedbacks={data.feedbacks} />}
      </div>
    </div>
  );
};

export default FeedbackPage;
