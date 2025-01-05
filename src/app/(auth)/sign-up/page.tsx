"use client";

import { SignUpForm } from "@/features/auth/sign-up/components/sign-up-form";

import { useSignUp } from "@/features/auth/sign-up/api/use-sign-up";
import { SignUpFormData } from "@/features/auth/sign-up/schema";

const Signup = () => {
  const { mutate, isPending } = useSignUp();

  const onSubmit = (data: SignUpFormData) => {
    mutate(data);
  };

  return <SignUpForm onSubmit={onSubmit} disabled={isPending} />;
};

export default Signup;
