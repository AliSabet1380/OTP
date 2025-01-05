import "server-only";
import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export const checkActivity = async (userId: string): Promise<boolean> => {
  try {
    const [data] = await db
      .select({
        isActive: users.isActive,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!data) throw new Error("User not found");

    return data.isActive;
  } catch {
    return false;
  }
};
