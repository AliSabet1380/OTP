import { z } from "zod";

export const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(32),
});

export type SignInFormData = z.infer<typeof schema>;
