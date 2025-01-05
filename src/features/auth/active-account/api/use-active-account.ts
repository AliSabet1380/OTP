"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.auth)["active-account"]["$post"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.auth)["active-account"]["$post"],
  200
>["data"];

export const useActiveAccount = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth["active-account"]["$post"]({
        json,
      });

      if (!response.ok) throw new Error((await response.json()).error);

      const { data } = await response.json();
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Activate account successful", {
        description: "You can now login to your account",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};
