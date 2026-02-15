/** @format */

import baseApi from "../api/baseAPI";
import type {
  CatalogueProductsResponse,
  ApiCatalogueProduct,
  UpdateProductRequest,
} from "@/types/AllTypes";

const catalogueAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCatalogueProducts: builder.query<CatalogueProductsResponse, void>({
      query: () => ({
        url: `/admins/products/`,
        method: "GET",
      }),
      providesTags: ["Catalogue"],
    }),

    updateProduct: builder.mutation<
      { success: boolean; message: string; product: ApiCatalogueProduct },
      { id: number; data: UpdateProductRequest }
    >({
      query: ({ id, data }) => ({
        url: `/admins/products/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Catalogue"],
    }),

    deleteProduct: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/admins/products/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Catalogue"],
    }),
  }),
});

export const {
  useGetCatalogueProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = catalogueAPI;

export default catalogueAPI;
