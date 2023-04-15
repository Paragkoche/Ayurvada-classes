import { HmacSHA512 } from "crypto-js";
import DB from "../DB";
import { User } from "../DB/User.db";
import { decode } from "../Util/JWT.token";
import { compare } from "bcrypt";
import { password_key } from "../Env";
export const getUser = (token: string) => {
  const id = decode(token).id;
  return DB.getRepository(User).findOneBy({
    id,
  });
};
export const getAllClient = async (token: string) => {
  const id = decode(token).id;
  const user = await DB.getRepository(User).findOneBy({
    id,
  });
  if (user.role == "admin" || user.role == "teacher") {
    return await DB.getRepository(User).find({
      where: {
        role: "client",
      },
    });
  } else {
    return new Error("Your not Admin");
  }
};
export const getAllTeacher = async (token: string) => {
  const id = decode(token).id;
  const user = await DB.getRepository(User).findOneBy({
    id,
  });
  if (user.role == "admin") {
    return await DB.getRepository(User).find({
      where: {
        role: "teacher",
      },
    });
  } else {
    return new Error("Your not Admin");
  }
};

//====================== ADMIN ==============================
export const make_admin = async (data: User) => {
  return DB.getRepository(User).save(
    DB.getRepository(User).create({
      ...data,
      gender: data.gender,
      is_active: true,
      role: "admin",
    })
  );
};
export const Login_admin = async ({ email, password }) => {
  const user = await DB.getRepository(User).findOne({
    where: {
      email,
      role: "admin",
    },
  });
  if (!user) return new Error("Email id not found");
  const hash1 = HmacSHA512(password, password_key).toString();
  const hash2 = await compare(hash1, user.password);
  if (!hash2) return new Error("Password invalid");
  return user;
};
//====================================================

//======================= TEACHER ============================
export const make_teacher = async (data: User) => {
  return DB.getRepository(User).save(
    DB.getRepository(User).create({
      ...data,
      gender: data.gender,
      is_active: true,
      role: "teacher",
    })
  );
};
export const Login_teacher = async ({ email, password }) => {
  const user = await DB.getRepository(User).findOne({
    where: {
      email,
      role: "teacher",
    },
  });
  if (!user) return new Error("Email id not found");
  const hash1 = HmacSHA512(password, password_key).toString();
  const hash2 = await compare(hash1, user.password);
  if (!hash2) return new Error("Password invalid");
  return user;
};
//====================================================

//======================== CLIENT ============================
export const make_client = async (data: User) => {
  return DB.getRepository(User).save(
    DB.getRepository(User).create({
      ...data,
      gender: data.gender,
      is_active: true,
      role: "client",
    })
  );
};
export const Login_client = async ({ email, password }) => {
  const user = await DB.getRepository(User).findOne({
    where: {
      email,
      role: "client",
    },
  });
  if (!user) return new Error("Email id not found");
  const hash1 = HmacSHA512(password, password_key).toString();
  const hash2 = await compare(hash1, user.password);
  if (!hash2) return new Error("Password invalid");
  return user;
};
//====================================================

//========= DELETE USER ==========
export const Delete_user = async (token: string) => {
  const id = decode(token).id;
  if (id) return new Error("user not Login");
  return DB.getRepository(User).delete({ id });
};
//======== UPDATE USER ======
export const Update_user = async (token: string, data: any) => {
  const id = decode(token).id;
  if (id) return new Error("user not Login");
  return DB.getRepository(User).update(
    {
      id,
    },
    data
  );
};
