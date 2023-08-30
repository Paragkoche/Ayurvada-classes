import axios, { AxiosProgressEvent } from "axios";

export const URL = "https://api.tanwishlife.com/v1";

const student_route = `${URL}/student`;
const admin_route = `${URL}/admin`;
const Login_user = `${URL}/user/login`;

//user login
export const Login = async (email: string, password: string) => {
  return axios.post(Login_user, { email, password });
};
// =========================(--STUDENT APIS--)============================================
export const StudentRegister = async (data: {
  name?: string;
  email: string;
  age: number;
  password: string;
  gender: string;
}) => {
  return axios.post(`${student_route}/register`, data);
};
const Token_axios = () =>
  new axios.Axios({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
export const getAllCourse = () => {
  return Token_axios().get(`${student_route}/all-classes`);
};
export const getAllCourse_you_pay = () => {
  return Token_axios().get(`${student_route}/your-pay-course`);
};
export const getAllVideo = (classesId: string) => {
  return Token_axios().get(`${student_route}/get-all-video/${classesId}`);
};
export const getVideo = (VideoId: string) => {
  return Token_axios().get(`${student_route}/get-video/${VideoId}`);
};
export const post_video_like = (VideoId: string) => {
  return Token_axios().post(`${student_route}/video/like/${VideoId}`);
};
export const post_video_command = (VideoId: string, message: string) => {
  return Token_axios().post(
    `${student_route}/video/comment/${VideoId}`,
    JSON.stringify({
      message,
    })
  );
};
export const post_video_command_of_command = (
  VideoId: string,
  message: string
) => {
  return Token_axios().post(
    `${student_route}/comment/comment/${VideoId}`,
    JSON.stringify({
      message,
    })
  );
};
export const send_otp = (data: { email: string; otp: string }) => {
  return axios.post(`${student_route}/verify-otp`, data);
};
// =========================(--STUDENT APIS--)============================================

// =========================(--ADMIN APIS--)============================================
const Token_admin_axios = () =>
  axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      // "Content-Type": "application/json",
    },
    baseURL: admin_route,
  });
export const Admin_home = () => {
  return Token_admin_axios().get("/home");
};
export const Users = () => {
  return Token_admin_axios().get("/users");
};
export const Classes = () => {
  return Token_admin_axios().get("/classes");
};
export const Videos = () => {
  return Token_admin_axios().get("/videos");
};
export const add_user = (data: {}) => {
  return Token_admin_axios().post("/add-user", data);
};
export const add_class = (data: {}) => {
  return Token_admin_axios().post("/add-class", data);
};
export const add_video_file = (
  data: any,
  fun: (e: AxiosProgressEvent) => void
) => {
  return axios.post("/api/video-upload", data, {
    onUploadProgress: fun,
  });
};
export const add_video_data = (data: {}) => {
  return Token_admin_axios().post("/add-video-data", data);
};
export const add_user_in_class = (data: {}) => {
  return Token_admin_axios().put("/add-user-in-class", data);
};
export const update_class = (data: {}) =>
  Token_admin_axios().put("/update-class", data);
export const one_class = (id: string) =>
  Token_admin_axios().get("/class/" + id);
export const one_video = (id: string) =>
  Token_admin_axios().get("/video/" + id);
export const one_user = (id: string) => Token_admin_axios().get("/user/" + id);

export const update_video = (data: any, id: string) =>
  Token_admin_axios().put("/update-video", {
    title: data.title,
    photo: data.photo,
    disc: data.disc,
    doc: data.doc,
    link: data.link,
    videoId: id,
  });
export const update_user = (data: {}, id: string) =>
  Token_admin_axios().put("/update-user", { ...data, userId: id });
export const delete_video = (id: string) =>
  Token_admin_axios().delete(`/video/${id}`);
export const delete_user = (id: string) =>
  Token_admin_axios().delete(`/user/${id}`);
export const delete_classes = (id: string) =>
  Token_admin_axios().delete(`/class/${id}`);
export const addUser = (data: {}) =>
  Token_admin_axios().post("/add-user", data);

// =========================(--ADMIN APIS--)============================================
