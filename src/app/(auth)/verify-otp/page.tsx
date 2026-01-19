/** @format */

import { AuthLayout } from "@/components/AuthComponents/AuthLayout";
import VerifyOtpForm from "@/components/AuthComponents/VerifyOtpForm";
import React from "react";

const VerifyOtpPage = () => {
  return (
    <AuthLayout>
      <VerifyOtpForm />
    </AuthLayout>
  );
};

export default VerifyOtpPage;
