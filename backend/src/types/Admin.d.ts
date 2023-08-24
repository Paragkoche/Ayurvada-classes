import { User } from "@/Database/Entity/Users.entity";
import { Request } from "express";

export interface AdminTokenRequest extends Request {
  adminData: User;
}

export interface Classes {
  photo: string;
  name: string;
  pay: number;
  end_on: string;
}

export interface video {
  title: string;
  photo: string;
  disc: string;
  link: string;
}
