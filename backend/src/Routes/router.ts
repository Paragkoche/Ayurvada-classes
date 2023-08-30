import { Router } from "express";
import StudentRoutes from "./Students/router";
import AdminRoutes from "./Admin/router";
import { Login, verify_otp } from "@/controllers/Student.controller";
import db from "@/Database";
import { User } from "@/Database/Entity/Users.entity";
import { OTP } from "@/Database/Entity/Otp.entity";
import { send_otp } from "@/Helpers/Email.helper";
import { password_hash } from "@/Helpers/Password.helper";
import { makeToken } from "@/Helpers/Token.helper";
const router = Router();

router.post("/forgot", async (req, res) => {
  try {
    const userdb = db.getRepository(User);

    const { email } = req.body;
    const user = await userdb.findOne({
      where: {
        email,
      },
    });
    if (!user)
      return res
        .status(401)
        .json({ status: 401, message: "email id not found" });
    const new_otp = await send_otp(user.email);
    if (!new_otp) return new Error("otp not send");
    return res.json({
      status: 200,
      massage: "otp send!",
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});
router.post("/password", async (req, res) => {
  try {
    const otpDb = db.getRepository(OTP);
    const userdb = db.getRepository(User);
    const { email, otp, password } = req.body;
    const otp_DB = await otpDb.findOne({
      where: {
        User: {
          email,
        },
      },
      relations: {
        User: true,
      },
    });
    if (!otp_DB)
      return res.status(401).json({
        status: 401,
        message: "Email id not found",
      });
    if (otp !== otp_DB.otp)
      return res.status(401).json({
        status: 401,
        message: "otp not valid",
      });
    const update_otpDB = otpDb.update(otp_DB.id, {
      isUse: true,
    });
    const userUpdate = userdb.update(otp_DB.User.id, {
      password: await password_hash(password),
    });
    if (!userUpdate) return new Error("password not update");
    const token = makeToken({ id: otp_DB.User.id });
    return res.json({
      status: 200,
      data: otp_DB.User,
      token,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});
router.post("/user/login", Login);
router.use("/student", StudentRoutes);
router.use("/admin", AdminRoutes);

export default router;
