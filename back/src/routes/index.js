import { Router } from "express";
// import { testController } from "../controllers/test.controller.js";

import usersRouter from "./users.js";
import eventsRouter from "./eventsAdmin.js";
import videosRouter from "./videos.js";
import contactRouter from "./contact.js";
import partnerRouter from "./partner.js";
import newsletterRoutes from "./newsletter.routes.js";
import faq from "./faq.js"; //Ajout par ED

const router = Router();

// router.get("/test", testController);

router.use("/users", usersRouter);
router.use("/videos", videosRouter);
router.use("/events", eventsRouter);
router.use("/partner", partnerRouter);
router.use("/contact", contactRouter);
router.use("/", newsletterRoutes);
router.use("/faq", faq);//Ajout pas ED

export default router;
