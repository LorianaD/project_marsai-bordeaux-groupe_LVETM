import { Router } from "express";
import GetAllContent from "../controllers/CMS/GetAllContent.controller.js";
import UpdateCms from "../controllers/CMS/UpdateCms.controller.js"
import GetContentByPageSection from "../controllers/CMS/GetContentByPageSection.controller.js";
import uploadIcon from "../middlewares/iconMiddleware.js";

const router = Router();

// routes en get
router.get("/", GetAllContent);
router.get("/:page/:section/:locale", GetContentByPageSection);

// routes en put
router.put("/:page/:section/:locale/:content_key", uploadIcon.single("file"), UpdateCms);

export default router;