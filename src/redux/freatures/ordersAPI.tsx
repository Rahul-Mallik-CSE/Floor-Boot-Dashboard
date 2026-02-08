/** @format */

import baseApi from "../api/baseAPI";
import type { OrdersResponse, OrdersQueryParams } from "@/types/orders";

const ordersAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<OrdersResponse, OrdersQueryParams>({
      query: ({ page = 1, query, search }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (query) params.append("query", query);
        if (search) params.append("search", search);

        return {
          url: `/admins/admin-orders/?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useLazyGetOrdersQuery } = ordersAPI;
export default ordersAPI;
