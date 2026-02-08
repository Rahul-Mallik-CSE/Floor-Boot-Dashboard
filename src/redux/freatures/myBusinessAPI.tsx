/** @format */

import baseAPI from "../api/baseAPI";

interface ProfileData {
  full_name: string;
  email: string;
  phone: string | null;
  image: string | null;
  latitude: string | null;
  longitude: string | null;
  country_or_region: string | null;
  address_line_i: string | null;
  address_line_ii: string | null;
  suburb: string | null;
  city: string | null;
  postal_code: string | null;
  state: string | null;
  delivery_instructions: string;
}

interface ProfileResponse {
  success: boolean;
  message: string;
  profile_data: ProfileData;
}

interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
  data: null;
}

const myBusinessAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: "/users/profile-data/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<ProfileResponse, any>({
      query: (data) => ({
        url: "/users/profile-data/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (data) => ({
        url: "/auth/changepassword/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = myBusinessAPI;

export default myBusinessAPI;
