import { Router } from "express";
import { AdminToken } from "@/Helpers/Token.helper";
import * as Controller from "@/controllers/admin.controller";
const router = Router();

router.get("/home", AdminToken, Controller.Home);
router.get("/users", AdminToken);
router.get("/classes", AdminToken);
router.get("/videos", AdminToken);
router.post("/add-user", AdminToken);
router.post("/add-class", AdminToken);
router.post("/add-video", AdminToken);
router.put("/add-user-in-class", AdminToken);
router.put("/update-user", AdminToken);
router.put("/update-video", AdminToken);
router.put("/update-class", AdminToken);
export default router;
