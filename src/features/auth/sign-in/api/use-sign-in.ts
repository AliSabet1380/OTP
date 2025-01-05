"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.auth)["sign-in"]["$post"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.auth)["sign-in"]["$post"],
  200
>["data"];

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth["sign-in"]["$post"]({ json });

      if (!response.ok) throw new Error((await response.json()).error);

      const { data } = await response.json();

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Sign in successfully");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};
