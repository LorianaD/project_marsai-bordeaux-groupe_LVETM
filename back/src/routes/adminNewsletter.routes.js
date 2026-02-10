import { Router } from "express";
import {
  adminListSubscribers,
  adminNewsletterStats,
} from "../controllers/adminNewsletter.controller.js";

const router = Router();

// ⚠️ plus tard tu ajoutes ici ton middleware auth admin
// router.use(requireAdminAuth);

router.get("/admin/newsletter/subscribers", adminListSubscribers);
router.get("/admin/newsletter/stats", adminNewsletterStats);

export default router;
