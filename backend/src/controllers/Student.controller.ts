import db from "@/Database";
import { Classes } from "@/Database/Entity/Classes.entity";
import { User } from "@/Database/Entity/Users.entity";
import { Comment, Like, Video } from "@/Database/Entity/Video.entity";
import { password_compare } from "@/Helpers/Password.helper";
import { makeToken } from "@/Helpers/Token.helper";
import {
  StudentInput,
  StudentLoginInput,
  StudentTokenRequest,
} from "@/types/Student";
import { send_otp as send_otp_ } from "@/Helpers/Email.helper";
import { Request, Response } from "express";
import { OTP } from "@/Database/Entity/Otp.entity";

const UserDb = db.getRepository(User);
const ClassesDb = db.getRepository(Classes);
const CommentDb = db.getRepository(Comment);
const VideoDb = db.getRepository(Video);
const LikeDb = db.getRepository(Like);
const otpDb = db.getRepository(OTP);
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

    // const token = makeToken({ id: data_user.id });
    return res.json({
      status: 200,
      message: "user registered",
      // data: data_user,
      // token,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
export const send_otp = (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    send_otp_(email).then(
      () => {
        return res.json({
          status: 200,
          message: "otp send",
        });
      },
      () => {
        return res.status(401).json({
          status: 401,
          message: "otp not send",
        });
      }
    );
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const verify_otp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const otp_DB = await otpDb.findOne({
      where: {
        User: {
          email,
        },
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
};
export const Login = async (req: Request, res: Response) => {
  try {
    const { password, email }: StudentLoginInput = req.body;
    const user = await UserDb.findOneBy({
      email,
    });
    if (!user)
      return res.status(401).json({
        status: 401,
        message: "User not found",
      });
    const password_right = await password_compare(password, user.password);
    if (!password_right)
      return res.status(401).json({
        status: 401,
        message: "Password Invalid",
      });
    const token = makeToken({ id: user.id });
    return res.json({
      status: 200,
      data: { user, token },
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const your_course = async (req: StudentTokenRequest, res: Response) => {
  try {
    const classes = await UserDb.find({
      where: {
        id: req.studentData.id,
      },
      relations: {
        payFor: true,
      },
      cache: true,
    });

    res.json({
      status: 200,
      data: classes[0].payFor,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: e.toString(),
    });
  }
};

export const all_course = async (req: StudentTokenRequest, res: Response) => {
  try {
    const data = await ClassesDb.find({
      relations: {
        users: true,
      },
      cache: true,
    });
    console.log(data);

    const slot_data = data.filter((v) => v.users?.id != req.studentData.id);
    return res.json({
      status: 200,
      data: slot_data,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: e.toString(),
    });
  }
};

export const get_all_video = async (
  req: StudentTokenRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const classes = await ClassesDb.find({
      where: {
        id,
        users: {
          id: req.studentData.id,
        },
      },

      relations: {
        Videos: true,
      },
    });
    if (classes.length == 0)
      return res.status(201).json({
        status: 201,
        message:
          "The class could not be found or it might not have been paid for.",
      });
    return res.json({
      status: 200,
      data: classes[0].Videos,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const get_video = async (req: StudentTokenRequest, res: Response) => {
  try {
    const { id } = req.params;
    const video = VideoDb.findOneBy({ id });
    if (!video)
      res.status(201).json({
        status: 201,
        message: "Video not found",
      });
    res.json({
      status: 200,
      data: video,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const add_like = async (req: StudentTokenRequest, res: Response) => {
  try {
    const { id } = req.params;
    const video = await VideoDb.find({
      where: {
        id,
      },
      relations: {
        Likes: true,
      },
    });
    if (video.length == 0)
      res.status(201).json({
        status: 201,
        message: "Video not found",
      });
    const create_like = await LikeDb.save(
      LikeDb.create({
        user: {
          id: req.studentData.id,
        },
      })
    );
    if (!create_like) return new Error("like not create");
    const update = await VideoDb.update(video[0].id, {
      Likes: [...video[0].Likes, create_like],
    });
    if (!update) return new Error("Like not add");
    return res.json({
      status: 200,
      data: create_like,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const add_comment_video = async (
  req: StudentTokenRequest,
  res: Response
) => {
  try {
    const { message } = req.body;
    const video = await VideoDb.find({
      where: { id: req.params.id },
      relations: {
        Comments: true,
      },
    });
    if (video.length === 0)
      return res.status(404).json({
        status: 404,
        message: "Video not find",
      });

    const data = await CommentDb.save(
      CommentDb.create({
        user: req.studentData,
        comment: message,
      })
    );
    const update_video = await VideoDb.update(video[0].id, {
      Comments: [...video[0].Comments, data],
    });
    if (!update_video) return new Error("Comment not add");
    return res.json({
      status: 200,
      data,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const add_comment = async (req: StudentTokenRequest, res: Response) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const comment = await CommentDb.find({
      where: {
        id,
      },
      relations: {
        Comment_of_Comment: true,
      },
    });
    if (comment.length == 0)
      return res.status(404).json({
        status: 404,
        message: "Comment not font",
      });
    const comment_create = await CommentDb.save(
      CommentDb.create({
        comment: message,
        user: { id: req.studentData.id },
      })
    );
    if (!comment_create) return new Error("Comment not create");

    const update_ = await CommentDb.update(comment[0].id, {
      Comment_of_Comment: [...comment[0].Comment_of_Comment],
    });
    if (!update_) return new Error("Comment not create");

    return res.json({
      status: 200,
      data: comment_create,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
