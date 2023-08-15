import { User } from "@/Database/Entity/Users.entity";
import { Request } from "express";

export interface AdminTokenRequest extends Request {
  adminData: User;
}
