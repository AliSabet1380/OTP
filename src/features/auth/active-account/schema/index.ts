import { z } from "zod";

export const schema = z.object({
  code: z.string().min(6).max(6),
});

export type ActiveAccountFormData = z.infer<typeof schema>;
