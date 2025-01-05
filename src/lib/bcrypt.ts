import "server-only";

import { compare, genSalt, hash } from "bcryptjs";

export const hashPassword = async (
  password: string,
  saltRounds: number = 10
): Promise<string> => {
  const salt = await genSalt(saltRounds);

  return await hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => await compare(password, hashPassword);
