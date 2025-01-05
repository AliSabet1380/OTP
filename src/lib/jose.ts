import "server-only";

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface SessionPayload extends JWTPayload {
  userId: string;
  expiresAt: Date;
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
export const COOKIE_NAME = "myapp-session";

export const encrypt = async (session: SessionPayload): Promise<string> => {
  return await new SignJWT(session)
    .setExpirationTime("1h")
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(secret);
};

export const decrypt = async (
  session: string | undefined = ""
): Promise<SessionPayload | null> => {
  try {
    if (!session) return null;

    const { payload } = await jwtVerify<SessionPayload>(session, secret, {
      algorithms: ["HS256"],
    });
    if (!payload) return null;

    return payload;
  } catch {
    return null;
  }
};

export const createSession = async (
  userId: string,
  redirectTo?: string
): Promise<void> => {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  (await cookies()).set(COOKIE_NAME, session, {
    httpOnly: true,
  });

  if (redirectTo) {
    redirect(redirectTo);
  }
};

export const verifySession = async (): Promise<string | null> => {
  const session = (await cookies()).get(COOKIE_NAME)?.value;

  const payload = await decrypt(session);
  if (!payload) return null;

  const isSessionValid = new Date(payload.expiresAt).getTime() > Date.now();
  if (!isSessionValid) return null;

  return payload.userId;
};

export const deleteSession = async (redirectTo?: string): Promise<void> => {
  (await cookies()).delete(COOKIE_NAME);

  if (redirectTo) {
    redirect(redirectTo);
  }
};
