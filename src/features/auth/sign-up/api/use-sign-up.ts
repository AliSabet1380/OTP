"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.auth)["sign-up"]["$post"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.auth)["sign-up"]["$post"],
  200
>["data"];

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth["sign-up"]["$post"]({ json });

      if (!response.ok) throw new Error((await response.json()).error);

      const { data } = await response.json();

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Sign up successful", {
        description: "Activate your account to continue",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};
