/** @format */

import FeedbackList from "@/components/FeedbackComponents/FeedbackList";
import { feedbackData } from "@/data/AllData";
import React from "react";

const FeedbackPage = () => {
  return (
    <div className="w-full  ">
      <div className="max-w-625 mx-auto px-2 md:px-4 py-6 ">
        <h1 className="text-black text-2xl md:text-3xl font-semibold mb-2 md:mb-4">
          Buyers Feedback
        </h1>
        <FeedbackList feedbacks={feedbackData} />
      </div>
    </div>
  );
};

export default FeedbackPage;
