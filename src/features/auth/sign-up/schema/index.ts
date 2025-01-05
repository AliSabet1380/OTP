import { z } from "zod";

export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  username: z.string().min(3).max(32),
});

export type SignUpFormData = z.infer<typeof schema>;
