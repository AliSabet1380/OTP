"use client";

import { useQuery } from "@tanstack/react-query";
import { InferResponseType, InferRequestType } from "hono";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.auth.$get>;
type ResponseType = InferResponseType<typeof client.api.auth.$get, 200>["data"];

export const useUser = () => {
  const { data, isLoading, error } = useQuery<ResponseType, Error, RequestType>(
    {
      queryKey: ["user"],
      queryFn: async () => {
        const response = await client.api.auth.$get();

        if (!response.ok) throw new Error((await response.json()).error);

        const { data } = await response.json();
        return data;
      },
    }
  );

  return { data, isLoading, error };
};
