"use client";

import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.auth)["resend-active-code"]["$post"],
  200
>["message"];

export const useSendEmail = () => {
  const { mutate, isPending } = useMutation<ResponseType, Error, void>({
    mutationFn: async () => {
      const response = await client.api.auth["resend-active-code"]["$post"]();

      if (!response.ok) throw new Error((await response.json()).error);

      const { message } = await response.json();

      return message;
    },
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};
