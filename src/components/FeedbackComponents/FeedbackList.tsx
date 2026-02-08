/** @format */

import React from "react";
import { FeedbackItem } from "@/types/AllTypes";
import FeedbackItem from "./FeedbackItem";

interface FeedbackListProps {
  feedbacks: FeedbackItem[];
}

const FeedbackList = ({ feedbacks }: FeedbackListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="divide-y divide-gray-200">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div key={feedback.id} className="px-3 md:px-6">
              <FeedbackItem feedback={feedback} />
            </div>
          ))
        ) : (
          <div className="px-6 py-12 text-center text-gray-500">
            No feedback available
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;
