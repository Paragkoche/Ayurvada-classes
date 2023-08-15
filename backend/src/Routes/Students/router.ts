import { Router } from "express";
import * as validation from "@/Helpers/Validation.helper";
import * as controller from "@/controllers/Student.controller";
import { StudentToken } from "@/Helpers/Token.helper";
const router = Router();

router.post("/register", validation.UserRegistration, controller.register);
router.post("/login", validation.UserLogin, controller.Login);
router.get("/your-pay-course", StudentToken, controller.your_course);
router.get("/all-classes", StudentToken, controller.all_course);

export default router;
