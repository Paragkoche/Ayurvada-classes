import { StudentInput, StudentLoginInput } from "@/types/Student";
import { NextFunction, Request, Response } from "express";
import db from "@/Database";
import { User } from "@/Database/Entity/Users.entity";
let password_regx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userDB = db.getRepository(User);

export const UserRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: StudentInput | any = req.body;
    console.log(data);

    if (
      data == undefined ||
      data.name == undefined ||
      data.email == undefined ||
      data.age == undefined ||
      data.password == undefined ||
      data.gender == undefined
    )
      return res.status(201).json({
        status: 201,
        message: "The input fields have not been properly completed.",
      });
    if (
      data.gender.toLocaleLowerCase() != "female" &&
      data.gender.toLocaleLowerCase() != "male" &&
      data.gender.toLocaleLowerCase() != "other"
    )
      return res.status(201).json({
        status: 201,
        message: "gender must be female, male, or other",
      });
    console.log(data.password.length <= 8);

    if (data.password.length <= 8 || !password_regx.test(data.password))
      return res.status(201).json({
        status: 401,
        message:
          "Password must be at least 8 characters long or include special characters.",
      });

    if (!emailRegex.test(data.email))
      return res.status(201).json({
        status: 201,
        message: "email id not valid",
      });
    const email_used = await userDB.findOne({
      where: {
        email: data.email,
      },
      cache: true,
    });
    if (email_used)
      return res.status(201).json({
        status: 201,
        message: "The email ID is already in use.",
      });
    return next();
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: e,
    });
  }
};

export const UserLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: StudentLoginInput = req.body;
    if (!email && !password)
      return res.status(201).json({
        status: 201,
        message: "input filed not complete",
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
