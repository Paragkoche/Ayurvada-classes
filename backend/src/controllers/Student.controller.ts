import db from "@/Database";
import { Classes } from "@/Database/Entity/Classes.entity";
import { User } from "@/Database/Entity/Users.entity";
import { Comment, Video } from "@/Database/Entity/Video.entity";
import { makeToken } from "@/Helpers/Token.helper";
import { StudentInput, StudentTokenRequest } from "@/types/Student";
import { Request, Response } from "express";

const UserDb = db.getRepository(User);
const ClassesDb = db.getRepository(Classes);
const CommentDb = db.getRepository(Comment);
const VideoDb = db.getRepository(Video);

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

export const your_course = async (req: StudentTokenRequest, res: Response) => {
  try {
    const classes = await UserDb.find({
      where: {
        id: req.studentData.id,
      },
      relations: {
        payFor: true,
      },
    });
    res.json({
      status: 200,
      data: classes[0].Classes,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const all_course = async (req: StudentTokenRequest, res: Response) => {
  try {
    const data = await ClassesDb.find({
      relations: {
        users: true,
      },
    });
    const slot_data = data.map((v) => v.users.id != req.studentData.id);
    return res.json({
      status: 200,
      data: slot_data,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const get_all_video = async (
  req: StudentTokenRequest,
  res: Response
) => {
  try {
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const get_video = async (req: StudentTokenRequest, res: Response) => {
  try {
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
export const add_like = async (req: StudentTokenRequest, res: Response) => {
  try {
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
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
