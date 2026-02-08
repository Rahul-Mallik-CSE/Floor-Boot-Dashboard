/** @format */

// Login Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  image: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  access: string;
  user: User;
}

// Forgot Password Types
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  errors: Record<string, unknown>;
}

// Verify OTP Types
export interface VerifyOtpRequest {
  otp: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  access: string;
  refresh: string;
}

// Reset Password Types
export interface ResetPasswordRequest {
  new_password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  data: null;
}
