"use client";

import { useForm } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  schema,
  type ActiveAccountFormData,
} from "@/features/auth/active-account/schema";

interface OtpFormProps {
  onSubmit: (data: ActiveAccountFormData) => void;
  onResend: () => void;
  disabled?: boolean;
  defaultValues?: ActiveAccountFormData;
}

export const OtpForm = ({
  onSubmit,
  disabled,
  onResend,
  defaultValues = { code: "" },
}: OtpFormProps) => {
  const form = useForm<ActiveAccountFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-xl font-semibold text-center mb-4">
          Activate Your Account
        </h2>
        <p className="text-sm text-gray-600 text-center mb-3">
          Enter the 6-digit OTP sent to your email.
        </p>
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full flex flex-col items-center justify-center space-y-2">
              <FormMessage />
              <FormControl>
                <InputOTP
                  className="h-6"
                  disabled={disabled}
                  maxLength={6}
                  {...field}
                  pattern={REGEXP_ONLY_DIGITS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      className="h-12 w-12 border-black/60"
                      index={0}
                    />
                    <InputOTPSlot
                      className="h-12 w-12 border-black/60"
                      index={1}
                    />
                    <InputOTPSlot
                      className="h-12 w-12 border-black/60"
                      index={2}
                    />
                    <InputOTPSlot
                      className="h-12 w-12 border-black/60"
                      index={3}
                    />
                    <InputOTPSlot
                      className="h-12 w-12 border-black/60"
                      index={4}
                    />
                    <InputOTPSlot
                      className="h-12 w-12 border-black/60"
                      index={5}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={disabled} className="w-full mt-4">
          {disabled ? "Verifying..." : "Activate Account"}
        </Button>
        <Button
          onClick={onResend}
          type="button"
          variant={"ghost"}
          disabled={disabled}
          className="w-full mt-2"
        >
          Resend Code
        </Button>
      </form>
    </Form>
  );
};
