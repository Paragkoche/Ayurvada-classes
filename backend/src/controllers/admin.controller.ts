import db from "@/Database";
import { Classes } from "@/Database/Entity/Classes.entity";
import { User } from "@/Database/Entity/Users.entity";
import { Comment, Like, Video } from "@/Database/Entity/Video.entity";
import { AdminTokenRequest } from "@/types/Admin";
import { Response } from "express";

const UserDb = db.getRepository(User);
const ClassesDb = db.getRepository(Classes);
const CommentDb = db.getRepository(Comment);
const VideoDb = db.getRepository(Video);
const LikeDb = db.getRepository(Like);

export const Home = async (req: AdminTokenRequest, res: Response) => {
  try {
    const [_UserData, UserCount] = await UserDb.findAndCount({
      where: {
        role: "Student",
      },
      select: {
        id: true,
      },
    });
    const [_ClassData, ClassCount] = await ClassesDb.findAndCount({
      select: {
        id: true,
      },
      cache: true,
    });
    const [_VideoData, VideoCount] = await VideoDb.findAndCount({
      select: {
        id: true,
      },
      cache: true,
    });
    const [_AdminData, AdminCount] = await UserDb.findAndCount({
      where: {
        role: "Admin",
      },
      select: {
        id: true,
      },
      cache: true,
    });
    const [_TeacherData, TeacherCount] = await UserDb.findAndCount({
      where: {
        role: "Teacher",
      },
      select: {
        id: true,
      },
      cache: true,
    });
    return res.json({
      status: 200,
      data: {
        Students: {
          count: UserCount,
        },
        Classes: {
          count: ClassCount,
        },
        videos: {
          count: VideoCount,
        },
        Admins: {
          count: AdminCount,
        },
        Teachers: {
          count: TeacherCount,
        },
      },
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
