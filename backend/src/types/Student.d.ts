import { User } from "@/Database/Entity/Users.entity";
import { Request } from "express";

export interface StudentTokenRequest extends Request {
  studentData: User;
}
export interface StudentInput {
  name?: string;
  email?: string;
  age?: number;
  password?: string;
  gender?: string;
}

export interface StudentLoingInput {
  email: string;
  password: string;
}
