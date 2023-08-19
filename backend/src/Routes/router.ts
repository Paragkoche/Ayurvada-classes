import { Router } from "express";
import StudentRoutes from "./Students/router";
import AdminRoutes from "./Admin/router";
import { Login } from "@/controllers/Student.controller";
const router = Router();
router.post("/user/login", Login);
router.use("/student", StudentRoutes);
router.use("/admin", AdminRoutes);

export default router;
