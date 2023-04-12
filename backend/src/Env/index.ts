import { config } from "dotenv";

config();
export const jwt_key = process.env.JWT_TOKEN as string;
export const password_key = process.env.Password_key as string;
