/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/freatures/authAPI";
import { saveTokens } from "@/services/authService";

export const SignInForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("Login attempt with:", { username: email });

    try {
      const response = await login({
        username: email,
        password: password,
      }).unwrap();

      console.log("Login response:", response);

      if (response.success) {
        // Save token to localStorage for API calls
        localStorage.setItem("accessToken", response.access);

        // Save user data to localStorage
        localStorage.setItem("user", JSON.stringify(response.user));

        // Save token to cookies for middleware
        await saveTokens(response.access, true);

        console.log("Login successful, redirecting...");

        // Redirect to dashboard
        router.push("/");
        router.refresh();
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
      const error = err as {
        data?: { message?: string; detail?: string };
        status?: number;
        error?: string;
      };

      // More detailed error handling
      if (error.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (error.data?.message) {
        setError(error.data.message);
      } else if (error.data?.detail) {
        setError(error.data.detail);
      } else if (error.error) {
        setError(error.error);
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    }
  };

  return (
    <div className="  p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500">
          Sign in to manage your airways, transactions and payouts
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
            placeholder="fhambe@made.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm"
            required
            disabled={isLoading}
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
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
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
              disabled={isLoading}
            />
            <span className="text-sm text-gray-700">Remember me</span>
          </label>
          <Link
            href="/forgot-pass"
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          className="w-full bg-teal-600 text-white py-4 h-10 md:h-11 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};
