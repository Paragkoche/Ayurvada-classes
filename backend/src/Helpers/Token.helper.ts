import { AdminTokenRequest } from "@/types/Admin";
import { config } from "dotenv";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import db from "@/Database";
import { User } from "@/Database/Entity/Users.entity";
import { StudentTokenRequest } from "@/types/Student";
config();
const UserRepo = db.getRepository(User);
export const AdminToken = async (
  req: AdminTokenRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = req.headers.authorization;
    if (!key)
      return res.status(201).json({
        status: 201,
        message: "Unauthorization",
      });
    else {
      const token = key.split(" ").at(-1);
      const { id } = jwt.verify(token, process.env.token_key) as jwt.JwtPayload;
      if (!id)
        return res.status(201).json({
          status: 201,
          message: "token is expired",
        });
      const data = await UserRepo.findOneBy({
        id,
      });
      if (!data)
        return res.status(404).json({
          status: 404,
          message: "Token invalid",
        });
      if (data.role == "Student")
        return res.status(201).json({
          status: 201,
          message: "token not Admin",
        });

      req.adminData = data;
      next();
    }
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: e,
    });
  }
};
export const StudentToken = async (
  req: StudentTokenRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const key = req.headers.authorization;
    if (!key)
      return res.status(201).json({
        status: 201,
        message: "Unauthorization",
      });
    else {
      const token = key.split(" ").at(-1);
      const { id } = jwt.verify(token, process.env.token_key) as jwt.JwtPayload;
      if (!id)
        return res.status(201).json({
          status: 201,
          message: "token is expired",
        });
      const data = await UserRepo.findOneBy({
        id,
      });
      if (!data)
        return res.status(404).json({
          status: 404,
          message: "Token invalid",
        });
      if (data.role != "Student")
        return res.status(201).json({
          status: 201,
          message: "token not Student",
        });

      req.studentData = data;
      next();
    }
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: e,
    });
  }
};
export const makeToken = (data: { id: string }) => {
  return jwt.sign(data, process.env.token_key);
};
