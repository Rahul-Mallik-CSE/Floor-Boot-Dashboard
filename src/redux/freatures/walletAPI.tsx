/** @format */

import baseApi from "../api/baseAPI";
import type { WalletBalanceResponse } from "@/types/AllTypes";

const walletAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWalletBalance: builder.query<WalletBalanceResponse, void>({
      query: () => ({
        url: `/admins/wallet-ballence/`,
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),
  }),
});

export const { useGetWalletBalanceQuery } = walletAPI;
export default walletAPI;
