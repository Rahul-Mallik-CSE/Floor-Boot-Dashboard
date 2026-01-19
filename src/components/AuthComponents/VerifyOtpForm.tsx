/** @format */

"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

const VerifyOtpForm: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(299); // 4:59 in seconds
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();
  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format timer display
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    pastedData.split("").forEach((char, index) => {
      if (index < 6 && /^\d$/.test(char)) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP verification logic
    console.log("Verify OTP:", otp.join(""));
    router.push("/set-new-pass");
  };

  const handleResendCode = () => {
    // Handle resend code logic
    console.log("Resend verification code");
    setTimer(299); // Reset timer
    setOtp(["", "", "", "", "", ""]); // Clear OTP
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Verify Email
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          We&apos;ve sent 6-digit verification code to your email address.
        </p>
        <p className="text-sm text-teal-600 font-medium">
          xyz...............@gamil.com
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Input Boxes */}
        <div className="flex justify-center gap-2 md:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Enter the code within{" "}
            <span className="text-teal-600 font-semibold">
              {formatTimer(timer)}
            </span>
          </p>
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors text-sm"
        >
          Verify Code & Continue
        </button>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t receive code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Resent Code
            </button>
          </p>
        </div>
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

export default VerifyOtpForm;
