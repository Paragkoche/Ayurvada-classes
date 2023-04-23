import { passwordKey } from "./env";
import { hash, genSalt, compare } from "bcrypt";
import { HmacSHA512, enc } from "crypto-js";
export const encode = async (password: string) => {
  const p1 = HmacSHA512(password, passwordKey).toString(enc.Hex);
  const p2 = await hash(p1, await genSalt(14));
  return p2;
};
export const decode = async (org_password: string, hash_password: string) => {
  const p1 = HmacSHA512(org_password, passwordKey).toString(enc.Hex);
  return await compare(p1, hash_password);
};
