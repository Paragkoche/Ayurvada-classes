import { compare } from "bcrypt";

export const password_compare = async (data: string, hash: string) =>
  await compare(data, hash);
