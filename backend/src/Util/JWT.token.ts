import * as jwt from "jsonwebtoken";
import * as env from "../Env";
export const encode = (data: any) => {
  return jwt.sign(data, env.jwt_key, {
    expiresIn: "30d",
  });
};
export const decode = (token: string): jwt.JwtPayload => {
  return jwt.verify(token, env.jwt_key) as jwt.JwtPayload;
};
