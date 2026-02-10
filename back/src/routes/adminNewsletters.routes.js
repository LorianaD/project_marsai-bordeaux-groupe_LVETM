import { Router } from "express";
import {
  adminListNewsletters,
  adminCreateNewsletter,
  adminGetNewsletter,
  adminUpdateNewsletter,
  adminPreviewNewsletter,
  adminSendTestNewsletter,
} from "../controllers/adminNewsletters.controller.js";
import {
  adminScheduleNewsletter,
  adminCancelSchedule,
  adminSendNow,
} from "../controllers/adminNewsletters.controller.js";

const router = Router();

// plus tard: middleware auth admin ici

router.get("/admin/newsletters", adminListNewsletters);
router.post("/admin/newsletters", adminCreateNewsletter);

router.get("/admin/newsletters/:id", adminGetNewsletter);
router.put("/admin/newsletters/:id", adminUpdateNewsletter);

router.get("/admin/newsletters/:id/preview", adminPreviewNewsletter);
router.post("/admin/newsletters/:id/send-test", adminSendTestNewsletter);

router.post("/admin/newsletters/:id/send-now", adminSendNow);
router.post("/admin/newsletters/:id/schedule", adminScheduleNewsletter);
router.post("/admin/newsletters/:id/cancel-schedule", adminCancelSchedule);

export default router;
