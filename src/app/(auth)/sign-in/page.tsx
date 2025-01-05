"use client";

import { SignInForm } from "@/features/auth/sign-in/components/sign-in-form";

import { useSignIn } from "@/features/auth/sign-in/api/use-sign-in";
import { SignInFormData } from "@/features/auth/sign-in/schema";

const Signin = () => {
  const { mutate, isPending } = useSignIn();

  const onSubmit = (data: SignInFormData) => {
    mutate(data);
  };

  return <SignInForm onSubmit={onSubmit} disabled={isPending} />;
};

export default Signin;
