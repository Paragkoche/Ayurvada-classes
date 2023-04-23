import { jwtKey } from "./env";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export const encode = (data: { id: string }) => {
  return sign(data, jwtKey);
};
export const decode = (token: string): JwtPayload | string => {
  return verify(token, jwtKey);
};
