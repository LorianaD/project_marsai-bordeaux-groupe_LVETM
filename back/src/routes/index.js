import { Router } from "express";
import testController from "../controllers/videos/test.controller.js";

const router = Router();

router.get("/test", testController);

export default router;
