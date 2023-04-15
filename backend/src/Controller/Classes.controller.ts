import db from "../DB";
import { Classes } from "../DB/Classes.db";
import { User } from "../DB/User.db";
import { decode, encode } from "../Util/JWT.token";
export const access_classes = async (token: any, id: any) => {};
export const get_classes_all = (token: any) => {
  const data = decode(token);
};
export const get_videos = (token: string, id: any) => {
  const data = decode(token);
};
export const get_classes_client = async (token: string) => {
  const data = decode(token);
  const user = await db.getRepository(User).findOneBy({
    id: data.id,
  });
  if (!user) return new Error("user not found");
  if (user.role !== "client") return new Error("your not client");
  return db.getRepository(Classes).findBy({
    access_by: {
      id: data.id,
    },
  });
};
