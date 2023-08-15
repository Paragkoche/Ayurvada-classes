import db from "@/Database";
import { User } from "@/Database/Entity/Users.entity";
import { Request, Response } from "express";
const UserDb = db.getRepository(User);

export const register = (req: Request, res: Response) => {};

export const Login = (req: Request, res: Response) => {};
