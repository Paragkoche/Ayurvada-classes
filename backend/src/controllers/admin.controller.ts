import db from "@/Database";
import { Classes } from "@/Database/Entity/Classes.entity";
import { PayFor, User } from "@/Database/Entity/Users.entity";
import { Comment, Like, Video } from "@/Database/Entity/Video.entity";
import { AdminTokenRequest } from "@/types/Admin";
import { StudentInput } from "@/types/Student";
import { Response } from "express";
import { randomUUID } from "crypto";
import moment from "moment";

import fs from "fs";
import disk from "diskusage";
import { calculateExpiredDate } from "@/Helpers/Date-time.helper";
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
const PayForDB = db.getRepository(PayFor);
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
    const classes = await ClassesDb.find();
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
    const users = await UserDb.find({
      where: {
        role: "Student",
      },
      relations: {
        payFor: {
          class: true,
        },
      },
    });
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
    const videos = await VideoDb.find();
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
    const id = randomUUID();
    new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(`./video/${id}.mp4`);
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
        resolve(`./video/${id}.mp4`);
      });
      stream.on("drain", () => {
        const written = parseInt(stream.bytesWritten.toString());
        const total = parseInt(req.headers["content-length"]);
        const pWritten = ((written / total) * 100).toFixed(2);
        // console.log(`Processing  ...  ${pWritten}% done`);
      });
    }).then(
      (path) => res.send({ status: "success", path }),
      (err) => res.send({ status: "error", err })
    );
  } catch (e) {
    console.log(e);

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
      VideoDb.create({
        // ...data,
        title: data.title,
        photo: data.photo,
        link: data.link,
        disc: data.disc,
        classes: {
          id: data.class,
        },
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
    if (!class_data)
      return res.status(401).json({
        status: 401,
        message: "Class not found",
      });
    const user_data = await UserDb.findOne({
      where: { id: userId, role: "Student" },
      relations: { payFor: true },
      cache: true,
    });
    if (!user_data)
      return res.status(401).json({
        status: 401,
        message: "User not found or use not student",
      });
    const _payFor = await PayForDB.save(
      PayForDB.create({
        class: class_data,
        endAt: calculateExpiredDate(class_data.end_on),
        user: user_data,
      })
    );
    console.log(_payFor, [...user_data.payFor, _payFor]);

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
export const delete_user_in_class = async (
  req: AdminTokenRequest,
  res: Response
) => {
  try {
    const { id } = req.body;
    const data = await PayForDB.delete(id);

    return res.json({
      status: 200,
      message: "ok",
      data,
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
    console.log(e);

    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: e.toString(),
    });
  }
};
export const Add_update_video = async (
  req: AdminTokenRequest,
  res: Response
) => {
  try {
    const data = req.body;

    const update_class = await VideoDb.update(
      { id: data.videoId },
      {
        title: data.title,
        photo: data.photo,
        disc: data.disc,
        doc: data.doc,
        link: data.link,
      }
    );
    console.log(data);

    console.log(update_class);

    if (!update_class) return new Error("Class not Update");
    return res.json({
      status: 200,
      data: await VideoDb.findOne({
        where: { id: data.videoId },
        cache: true,
      }),
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
export const Add_update_class = async (
  req: AdminTokenRequest,
  res: Response
) => {
  try {
    const data = req.body;
    const update_class = await ClassesDb.update(data.classId, {
      name: data.name,
      pay: data.pay,
      photo: data.photo,
      end_on: data.end_on,
    });
    if (!update_class) return new Error("Class not Update");
    return res.json({
      status: 200,
      data: await ClassesDb.findOne({
        where: { id: data.classId },
        cache: true,
      }),
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

export const one_class = async (req: AdminTokenRequest, res: Response) => {
  try {
    return res.json({
      status: 200,
      data: await ClassesDb.findOne({
        where: { id: req.params.id },
        cache: true,
      }),
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
export const one_user = async (req: AdminTokenRequest, res: Response) => {
  try {
    return res.json({
      status: 200,
      data: await UserDb.findOne({
        where: { id: req.params.id },
        cache: true,
        relations: {
          payFor: {
            class: true,
          },
        },
      }),
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
export const one_video = async (req: AdminTokenRequest, res: Response) => {
  try {
    return res.json({
      status: 200,
      data: await VideoDb.findOne({
        where: { id: req.params.id },
        cache: true,
      }),
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

export const one_user_delete = async (
  req: AdminTokenRequest,
  res: Response
) => {
  try {
    const delete_user = await UserDb.delete({
      id: req.params.id,
    });
    if (!delete_user) return new Error("User not delete");
    return res.json({
      status: 200,
      message: "User delete",
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
export const one_video_delete = async (
  req: AdminTokenRequest,
  res: Response
) => {
  try {
    const delete_user = await VideoDb.delete({
      id: req.params.id,
    });
    if (!delete_user) return new Error("Video not delete");
    return res.json({
      status: 200,
      message: "Video delete",
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

export const one_class_delete = async (
  req: AdminTokenRequest,
  res: Response
) => {
  try {
    const delete_user = await ClassesDb.delete({
      id: req.params.id,
    });
    if (!delete_user) return new Error("Class not delete");
    return res.json({
      status: 200,
      message: "Class delete",
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
