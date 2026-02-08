/** @format */

import baseApi from "../api/baseAPI";
import type {
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/types/auth";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: `/auth/login/`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (data) => ({
        url: `/auth/forgetpassword/`,
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation<
      VerifyOtpResponse,
      { email: string; otp: string }
    >({
      query: ({ email, otp }) => ({
        url: `/auth/vefiry_for_forget/${email}/`,
        method: "POST",
        body: { otp },
      }),
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (data) => ({
        url: `/auth/reset_password/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authAPI;
