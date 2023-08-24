import db from "@/Database";
import { Classes } from "@/Database/Entity/Classes.entity";
import { User } from "@/Database/Entity/Users.entity";
import { Comment, Like, Video } from "@/Database/Entity/Video.entity";
import { AdminTokenRequest } from "@/types/Admin";
import { StudentInput } from "@/types/Student";
import { Response } from "express";
import { randomUUID } from "crypto";
import fs from "fs";
import disk from "diskusage";
function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
const UserDb = db.getRepository(User);
const ClassesDb = db.getRepository(Classes);
const CommentDb = db.getRepository(Comment);
const VideoDb = db.getRepository(Video);
const LikeDb = db.getRepository(Like);

export const Home = async (req: AdminTokenRequest, res: Response) => {
  try {
    const formtter = new Intl.NumberFormat("en", {
      unit: "gigabyte",
      style: "unit",
    });
    const Disk = await disk.check("./");
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
        storage: {
          available: formatBytes(Disk.available),
          free: formatBytes(Disk.free),
          total: formatBytes(Disk.total),
        },
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
export const get_list_of_class = async (
  req: AdminTokenRequest,
  res: Response
) => {
  try {
    const classes = ClassesDb.find();
    res.json({
      status: 200,
      data: classes,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
export const get_list_of_user = async (
  req: AdminTokenRequest,
  res: Response
) => {
  try {
    const users = UserDb.find();
    res.json({
      status: 200,
      data: users,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
export const get_list_of_video = async (
  req: AdminTokenRequest,
  res: Response
) => {
  try {
    const videos = VideoDb.find();
    res.json({
      status: 200,
      data: videos,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
// export const get_list_of_class = async(req: AdminTokenRequest, res: Response)=>{}
export const Add_user = async (req: AdminTokenRequest, res: Response) => {
  try {
    const data: StudentInput = req.body;
    const data_user = await UserDb.save(
      UserDb.create({
        ...data,
        is_active: true,
        role: "Student",
      })
    );

    return res.json({
      status: 200,
      data: data_user,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

export const Add_Class = async (req: AdminTokenRequest, res: Response) => {
  try {
    const data = req.body;
    const new_class = await ClassesDb.save(
      ClassesDb.create({
        ...data,
      })
    );
    return res.json({
      status: 200,
      data: new_class,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
export const Add_Video = async (req: AdminTokenRequest, res: Response) => {
  try {
    new Promise((resolve, reject) => {
      const stream = fs.createWriteStream("./ok.mp4");
      stream.on("open", () => {
        console.log("Stream open ...  0.00%");
        req.pipe(stream);
      });
      stream.on("error", (err) => {
        console.error(err);
        reject(err);
      });
      stream.on("close", () => {
        console.log("Processing  ...  100%");
        resolve(`./video/${randomUUID()}.mp4`);
      });
      stream.on("drain", () => {
        const written = parseInt(stream.bytesWritten.toString());
        const total = parseInt(req.headers["content-length"]);
        const pWritten = ((written / total) * 100).toFixed(2);
        console.log(`Processing  ...  ${pWritten}% done`);
      });
    }).then(
      (path) => res.send({ status: "success", path }),
      (err) => res.send({ status: "error", err })
    );
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
export const Add_Video_db = async (req: AdminTokenRequest, res: Response) => {
  try {
    const data = req.body;
    const new_video = await VideoDb.save(
      ClassesDb.create({
        ...data,
      })
    );
    return res.json({
      status: 200,
      data: new_video,
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
export const Add_user_in_class = async (
  req: AdminTokenRequest,
  res: Response
) => {
  try {
    const { classId, userId } = req.body;
    const class_data = await ClassesDb.findOne({
      where: { id: classId },
      cache: true,
    });
    const user_data = await UserDb.findOne({
      where: { id: userId },
      relations: { payFor: true },
      cache: true,
    });
    const update_user = UserDb.update(userId, {
      payFor: [...user_data.payFor, class_data],
    });
    if (!update_user) return new Error("User not add in class ");
    return res.json({
      status: 200,
      data: "ok",
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
export const Add_update_user = async (
  req: AdminTokenRequest,
  res: Response
) => {
  try {
    const data = req.body;
    const update_user = await UserDb.update(data.userId, {
      ...data,
    });
    if (!update_user) return new Error("User not Update");
    return res.json({
      status: 200,
      data: await UserDb.findOne({ where: { id: data.userId } }),
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};
export const Add_update_video = async (
  req: AdminTokenRequest,
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
export const Add_update_class = async (
  req: AdminTokenRequest,
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
