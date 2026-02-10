import { Router } from "express";

// import { testController } from "../controllers/test.controller.js";
import eventsPublicRouter from "./eventsPublic.js";
import usersRouter from "./users.js";
import eventsRouter from "./eventsAdmin.js";
import videosRouter from "./videos.js";
import contactRouter from "./contact.js";
import partnerRouter from "./partner.js";
import cmsRouter from "./cms.js";
import newsletterRouter from "./newsletter.routes.js";
import juryRouter from "./jury.js";
import faq from "./faq.js";

const router = Router();

// router.get("/test", testController);

router.use("/users", usersRouter);
router.use("/videos", videosRouter);
router.use("/events", eventsPublicRouter);
router.use("/admin/events", eventsRouter);
router.use("/partner", partnerRouter);
router.use("/contact", contactRouter);
router.use("/faq", faq);
router.use("/cms", cmsRouter);
router.use("/newsletter", newsletterRouter);
router.use("/jury", juryRouter);

export default router;
