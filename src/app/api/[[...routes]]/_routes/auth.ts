import { z } from "zod";
import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

import { validate } from "@/app/api/[[...routes]]/_middleware/validate";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { resend } from "@/lib/resend";
import { createSession, deleteSession } from "@/lib/jose";
import { comparePassword, hashPassword } from "@/lib/bcrypt";

import { EmailTemplate } from "@/components/email/email-template";

export const auth = new Hono()
  .get("/", validate, async (c) => {
    const userId = c.get("userId");

    const [data] = await db
      .select({
        id: users.id,
        avatar: users.avatar,
        username: users.username,
        email: users.email,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, userId));
    if (!data) return c.json({ error: "User not found" }, 404);

    await createSession(data.id);

    return c.json({ data }, 200);
  })
  .get("/sign-out", validate, async (c) => {
    await deleteSession();

    return c.json(null, 200);
  })
  .post(
    "/sign-in",
    zValidator(
      "json",
      z.object({
        email: z.string().email(),
        password: z.string().min(8).max(32),
      })
    ),

    async (c) => {
      const { email, password } = c.req.valid("json");

      const [data] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      if (!data)
        return c.json({ error: "Email or password is incorrect" }, 404);

      const isPasswordCorrect = await comparePassword(password, data.password);
      if (!isPasswordCorrect)
        return c.json({ error: "Email or password is incorrect" }, 401);

      await createSession(data.id);
      return c.json({ data: { ...data, password: undefined } }, 200);
    }
  )
  .post(
    "/sign-up",
    zValidator(
      "json",
      z.object({
        username: z.string().min(3).max(32),
        email: z.string().email(),
        password: z.string().min(8).max(32),
      })
    ),
    async (c) => {
      const { username, email, password } = c.req.valid("json");

      const hashedPassword = await hashPassword(password);

      const [data] = await db
        .insert(users)
        .values({
          username,
          email,
          password: hashedPassword,
        })
        .returning({
          id: users.id,
          avatar: users.avatar,
          username: users.username,
          email: users.email,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
          role: users.role,
          activeCode: users.activeCode,
        });
      if (!data) return c.json({ error: "Fail to create user" }, 500);

      await createSession(data.id);

      const { error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: data.email,
        subject: "Activate your account",
        react: EmailTemplate({
          activationCode: data.activeCode,
          username: data.username,
        }),
      });

      if (error) return c.json({ error: "Fail to send activation code" }, 500);

      return c.json({ data }, 200);
    }
  )
  .post(
    "/resend-active-code",
    validate,

    async (c) => {
      const userId = c.get("userId");

      const [data] = await db
        .select({
          activeCode: users.activeCode,
          username: users.username,
          email: users.email,
        })
        .from(users)
        .where(eq(users.id, userId));

      if (!data) return c.json({ error: "User not found" }, 404);

      const { error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: data.email,
        subject: "Activate your account",
        react: EmailTemplate({
          activationCode: data.activeCode,
          username: data.username,
        }),
      });

      if (error) return c.json({ error: "Fail to send activation code" }, 500);

      return c.json({ message: "Activation code sent successfully" }, 200);
    }
  )
  .post(
    "/active-account",
    validate,
    zValidator(
      "json",
      z.object({
        code: z.number(),
      })
    ),
    async (c) => {
      const { code } = c.req.valid("json");

      const userId = c.get("userId");

      const [data] = await db.select().from(users).where(eq(users.id, userId));
      if (!data) return c.json({ error: "User not found" }, 404);

      const isCodeCorrect = code === data.activeCode;
      if (!isCodeCorrect)
        return c.json({ error: "acitvate code is incorrect" }, 401);

      const [updatedData] = await db
        .update(users)
        .set({
          activeCode: undefined,
          isActive: true,
        })
        .where(eq(users.id, userId))
        .returning({
          id: users.id,
          avatar: users.avatar,
          username: users.username,
          email: users.email,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
          role: users.role,
        });
      if (!updatedData) return c.json({ error: "Fail to update user" }, 500);

      return c.json({ data }, 200);
    }
  );
