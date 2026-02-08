/** @format */

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/freatures/authAPI";

const SetNewPassForm: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Password validation criteria - using useMemo to avoid cascading renders
  const validations = useMemo(
    () => ({
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }),
    [password],
  );

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    if (password.length === 0) {
      return "";
    } else if (password.length < 8) {
      return "Weak";
    } else if (validations.hasNumber && validations.hasSpecialChar) {
      return "Strong";
    } else {
      return "Medium Strength";
    }
  }, [password, validations.hasNumber, validations.hasSpecialChar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password requirements
    if (
      !validations.minLength ||
      !validations.hasNumber ||
      !validations.hasSpecialChar
    ) {
      setError("Please meet all password requirements");
      return;
    }

    try {
      const response = await resetPassword({
        new_password: password,
      }).unwrap();

      if (response.success) {
        // Clear stored data
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("accessToken");

        // Redirect to sign in page
        router.push("/sign-in");
      }
    } catch (err: unknown) {
      console.error("Reset password error:", err);
      const error = err as { data?: { message?: string } };
      setError(
        error.data?.message || "Failed to reset password. Please try again.",
      );
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Set a New Password
        </h1>
        <p className="text-sm text-gray-500">
          Create a strong password to keep your account secure
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

        {/* New Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    passwordStrength === "Weak"
                      ? "w-1/3 bg-red-500"
                      : passwordStrength === "Medium Strength"
                        ? "w-2/3 bg-yellow-500"
                        : passwordStrength === "Strong"
                          ? "w-full bg-green-500"
                          : "w-0"
                  }`}
                />
              </div>
              <span className="text-xs text-gray-600 font-medium min-w-fit">
                {passwordStrength}
              </span>
            </div>
          )}
        </div>

        {/* Password Requirements */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                validations.minLength ? "bg-teal-600" : "bg-gray-300"
              }`}
            >
              {validations.minLength && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <span
              className={`text-sm ${
                validations.minLength ? "text-gray-700" : "text-gray-500"
              }`}
            >
              Must be at least 8 characters
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                validations.hasNumber ? "bg-teal-600" : "bg-gray-300"
              }`}
            >
              {validations.hasNumber && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <span
              className={`text-sm ${
                validations.hasNumber ? "text-gray-700" : "text-gray-500"
              }`}
            >
              Must contain one number
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                validations.hasSpecialChar ? "bg-teal-600" : "bg-gray-300"
              }`}
            >
              {validations.hasSpecialChar && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <span
              className={`text-sm ${
                validations.hasSpecialChar ? "text-gray-700" : "text-gray-500"
              }`}
            >
              Must contain one special character
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Save New Password Button */}
        <Button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 h-10 md:h-11 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save New Password"}
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

export default SetNewPassForm;
