import { Router } from "express";
import { AdminToken } from "@/Helpers/Token.helper";
import * as Controller from "@/controllers/admin.controller";
import { ClassesAdd, UserRegistration } from "@/Helpers/Validation.helper";
const router = Router();

router.get("/home", AdminToken, Controller.Home);
router.get("/users", AdminToken, Controller.get_list_of_user);
router.get("/classes", AdminToken, Controller.get_list_of_class);
router.get("/videos", AdminToken, Controller.Add_update_video);
router.post("/add-user", AdminToken, UserRegistration, Controller.Add_user);
router.post("/add-class", AdminToken, ClassesAdd, Controller.Add_Class);
router.post("/add-video-file", Controller.Add_Video);
router.post("/add-video-data", Controller.Add_Video_db);
router.put("/add-user-in-class", AdminToken, Controller.Add_user_in_class);
router.put("/update-user", AdminToken, Controller.Add_update_user);
router.put("/update-video", AdminToken, Controller.Add_update_video);
router.put("/update-class", AdminToken, Controller.Add_update_class);

export default router;
