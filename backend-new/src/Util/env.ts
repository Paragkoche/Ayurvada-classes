import { config } from "dotenv";
config();
export const passwordKey = process.env.PASSWORD_KEY || "";
export const jwtKey = process.env.JWT_KEY || "";
export const pay_key = process.env.STRIPE_KEY || "";
