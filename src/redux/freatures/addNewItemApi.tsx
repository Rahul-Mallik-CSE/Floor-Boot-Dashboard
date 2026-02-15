/** @format */

import baseApi from "../api/baseAPI";
import type {
  CategoriesResponse,
  CreateProductResponse,
} from "@/types/AllTypes";

const addNewItemAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => ({
        url: `/users/categories/`,
        method: "GET",
      }),
    }),

    createProduct: builder.mutation<CreateProductResponse, FormData>({
      query: (formData) => ({
        url: `/admins/products/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Catalogue"],
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateProductMutation } =
  addNewItemAPI;

export default addNewItemAPI;
