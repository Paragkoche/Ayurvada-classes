import { Router } from "express";
import * as validation from "@/Helpers/Validation.helper";
import * as controller from "@/controllers/Student.controller";
import { StudentToken } from "@/Helpers/Token.helper";
const router = Router();

router.post("/register", validation.UserRegistration, controller.register);
router.post("/verify-otp", validation.Otp_validated, controller.verify_otp);
router.get("/your-pay-course", StudentToken, controller.your_course);
router.get("/all-classes", StudentToken, controller.all_course);
router.get("/get-all-video/:id", StudentToken, controller.get_all_video);
router.get("/get-video/:id", StudentToken, controller.get_video);
router.post("/video/like/:id", StudentToken, controller.add_like);
router.post("/video/comment/:id", StudentToken, controller.add_comment_video);
router.post("/comment/comment/:id", StudentToken, controller.add_comment);
export default router;
