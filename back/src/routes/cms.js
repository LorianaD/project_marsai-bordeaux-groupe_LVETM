import { Router } from "express";
import GetAllContent from "../controllers/CMS/GetAllContent.controller.js";

const router = Router();

// routes en get
router.get("/", GetAllContent);

export default router;