/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useForgotPasswordMutation } from "@/redux/freatures/authAPI";

const ForgotPassForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await forgotPassword({ email }).unwrap();

      if (response.success) {
        // Store email in localStorage for use in verify OTP page
        localStorage.setItem("resetEmail", email);

        // Redirect to verify OTP page
        router.push("/verify-otp");
      }
    } catch (err: unknown) {
      console.error("Forgot password error:", err);
      const error = err as { data?: { message?: string } };
      setError(
        error.data?.message ||
          "Failed to send verification code. Please try again.",
      );
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-500">
          No worries. Enter your email address and we&apos;ll send you a
          verification code to reset it.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Email/Phone */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email / Phone
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Name@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm"
            required
            disabled={isLoading}
          />
        </div>

        {/* Info Text */}
        <div className="flex items-start gap-2">
          <div className="bg-gray-900 text-white rounded-full p-1 mt-0.5">
            <Info className="w-3 h-3" />
          </div>
          <p className="text-sm text-gray-600">
            Use the email associated with your account.
          </p>
        </div>

        {/* Send Verification Code Button */}
        <Button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 h-10 md:h-11 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Verification Code"}
        </Button>

        {/* Back to Sign In */}
        <div className="text-center pt-2">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassForm;
