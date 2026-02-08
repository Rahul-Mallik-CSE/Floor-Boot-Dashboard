/** @format */

import baseApi from "../api/baseAPI";
import type { FeedbackResponse } from "@/types/AllTypes";

const feedbackAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbacks: builder.query<FeedbackResponse, void>({
      query: () => ({
        url: `/admins/feed-backs/`,
        method: "GET",
      }),
      providesTags: ["Feedback"],
    }),
  }),
});

export const { useGetFeedbacksQuery } = feedbackAPI;
export default feedbackAPI;
