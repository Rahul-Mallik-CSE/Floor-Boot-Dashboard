/** @format */

import baseApi from "../api/baseAPI";
import type {
  OrdersResponse,
  OrdersQueryParams,
  OrderDetailsResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from "@/types/orders";

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
    getOrderDetails: builder.query<OrderDetailsResponse, number>({
      query: (orderId) => ({
        url: `/admins/orders/${orderId}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, orderId) => [
        { type: "Orders", id: orderId },
      ],
    }),
    updateOrder: builder.mutation<
      UpdateOrderResponse,
      { orderId: number; data: UpdateOrderRequest }
    >({
      query: ({ orderId, data }) => ({
        url: `/admins/orders/${orderId}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        { type: "Orders", id: orderId },
        "Orders",
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useLazyGetOrdersQuery,
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} = ordersAPI;
export default ordersAPI;
