/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import { useRouter } from "next/navigation";

const ForgotPassForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle verification code logic
    console.log("Send verification code to:", email);
    router.push("/verify-otp");
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
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm"
        >
          Send Verification Code
        </button>

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
