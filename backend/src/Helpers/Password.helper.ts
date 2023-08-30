import { compare, genSalt, hash } from "bcrypt";

export const password_compare = async (data: string, hash: string) =>
  await compare(data, hash);

export const password_hash = async (data: string) =>
  await hash(data, await genSalt(14));
