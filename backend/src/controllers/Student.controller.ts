import db from "@/Database";
import { User } from "@/Database/Entity/Users.entity";
import { makeToken } from "@/Helpers/Token.helper";
import { StudentInput, StudentTokenRequest } from "@/types/Student";
import { Request, Response } from "express";
const UserDb = db.getRepository(User);

export const register = async (req: Request, res: Response) => {
  try {
    const data: StudentInput = req.body;
    const data_user = await UserDb.save(
      UserDb.create({
        ...data,
        is_active: true,
        role: "Student",
      })
    );

    const token = makeToken({ id: data_user.id });
    return res.json({
      status: 200,
      data: data_user,
      token,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const Login = (req: Request, res: Response) => {
  try {
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const your_course = (req: StudentTokenRequest, res: Response) => {
  try {
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const all_course = (req: StudentTokenRequest, res: Response) => {
  try {
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
