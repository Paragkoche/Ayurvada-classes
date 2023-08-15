import { StudentInput, StudentLoingInput } from "@/types/Student";
import { NextFunction, Request, Response } from "express";
let password_regx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const UserRagistration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, age, password, gender }: StudentInput = req.body;
    if (!name && !email && !age && !password && !gender)
      return res.status(201).json({
        status: 201,
        message: "input filde not complite",
      });
    if (
      gender.toLocaleLowerCase() != "female" ||
      gender.toLocaleLowerCase() != "male" ||
      gender.toLocaleLowerCase() != "other"
    )
      return res.status(201).json({
        status: 201,
        message: "gender must be female, male, or other",
      });
    if (password.length >= 8 || !password_regx.test(password))
      return res.status(201).json({
        status: 401,
        message:
          "Password must be at least 8 characters long or include special characters.",
      });

    if (!emailRegex.test(email))
      return res.status(201).json({
        status: 201,
        message: "email id not valid",
      });
    return next();
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: e,
    });
  }
};

export const UserLoing = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: StudentLoingInput = req.body;
    if (!email && !password)
      return res.status(201).json({
        status: 201,
        message: "input filde not complite",
      });
    return next();
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: e,
    });
  }
};
