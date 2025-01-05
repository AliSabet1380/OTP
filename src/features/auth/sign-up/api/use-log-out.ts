import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useLogOut = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<void, Error, void>({
    mutationFn: async () => {
      await client.api.auth["sign-out"]["$get"]();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Log out successfully");
      location.replace("/");
    },
    onError: () => {
      toast.error("Fail to LogOut");
    },
  });

  return { mutate, isPending };
};
