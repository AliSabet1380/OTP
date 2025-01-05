import { type MiddlewareHandler } from "hono";

import { verifySession } from "@/lib/jose";

declare module "hono" {
  interface ContextVariableMap {
    userId: string;
  }
}

export const validate: MiddlewareHandler = async (c, next) => {
  const userId = await verifySession();
  if (!userId) return c.json({ error: "Unauthorized" }, 401);

  c.set("userId", userId);

  await next();
};
