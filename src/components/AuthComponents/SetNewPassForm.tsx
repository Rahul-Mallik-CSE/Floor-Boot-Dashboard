/** @format */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import { Button } from "../ui/button";

const SetNewPassForm: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  // Password validation criteria
  const [validations, setValidations] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    // Check password validations
    setValidations({
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });

    // Calculate password strength
    if (password.length === 0) {
      setPasswordStrength("");
    } else if (password.length < 8) {
      setPasswordStrength("Weak");
    } else if (validations.hasNumber && validations.hasSpecialChar) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium Strength");
    }
  }, [password, validations.hasNumber, validations.hasSpecialChar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save new password logic
    console.log("Save new password");
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
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
          className="w-full bg-teal-600 text-white py-3 h-10 md:h-11 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm"
        >
          Save New Password
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
