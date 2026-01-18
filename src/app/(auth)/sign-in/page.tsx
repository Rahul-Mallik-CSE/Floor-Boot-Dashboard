/** @format */

import React from "react";
import { AuthLayout } from "@/components/AuthComponents/AuthLayout";
import { SignInForm } from "@/components/AuthComponents/SignInForm";

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;
