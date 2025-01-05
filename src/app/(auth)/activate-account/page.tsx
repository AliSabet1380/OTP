"use client";

import { useActiveAccount } from "@/features/auth/active-account/api/use-active-account";
import { OtpForm } from "@/features/auth/active-account/components/otp-form";
import { useSendEmail } from "@/features/auth/active-account/api/use-send-email";
import { type ActiveAccountFormData } from "@/features/auth/active-account/schema";

const ActivateAccount = () => {
  const { mutate, isPending } = useActiveAccount();
  const { mutate: sendEmail, isPending: isSendingEmail } = useSendEmail();

  const onSubmit = (data: ActiveAccountFormData) => {
    mutate({ code: +data.code });
  };

  return (
    <OtpForm
      onSubmit={onSubmit}
      disabled={isPending || isSendingEmail}
      onResend={() => sendEmail()}
    />
  );
};

export default ActivateAccount;
