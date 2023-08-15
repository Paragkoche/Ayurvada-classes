import { Router } from "express";
import * as validation from "@/Helpers/Validation.helper";
import * as controller from "@/controllers/Student.controller";
import { StudentToken } from "@/Helpers/Token.helper";
const router = Router();

router.post("/register", validation.UserRagistration, controller.register);
router.post("/login", validation.UserLoing, controller.Login);
router.get("/your-pay-course", StudentToken);
router.get("/all-classes", StudentToken);

export default router;
