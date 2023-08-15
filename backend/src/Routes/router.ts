import { Router } from "express";
import StudentRoutes from "./Students/router";
const router = Router();

router.use("/student", StudentRoutes);
export default router;
