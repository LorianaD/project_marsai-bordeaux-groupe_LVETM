import { Router } from "express";

import eventsPublicRouter from "./eventsPublic.js";
import usersRouter from "./users.js";
import eventsRouter from "./eventsAdmin.js";
import videosRouter from "./videos.js";
import contactRouter from "./contact.js";
import partnerRouter from "./partner.js";
import cmsRouter from "./cms.js";
import juryRouter from "./jury.js";
import newsletterRoutes from "./newsletter.routes.js";
import adminNewsletterRoutes from "./adminNewsletter.routes.js";
import adminNewslettersRoutes from "./adminNewsletters.routes.js";
import newsletterUploadRoutes from "./newsletterUpload.routes.js";
import contactAdminRoutes from "./contactAdmin.routes.js";
import faq from "./faq.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/videos", videosRouter);

router.use("/events", eventsPublicRouter);
router.use("/admin/events", eventsRouter);

router.use("/partner", partnerRouter);
router.use("/contact", contactRouter);
router.use("/contact/admin", contactAdminRoutes); 
router.use("/faq", faq);
router.use("/cms", cmsRouter);

router.use("/jury", juryRouter);
router.use("/newsletter", newsletterRoutes);
router.use(adminNewsletterRoutes);
router.use(adminNewslettersRoutes);
router.use(newsletterUploadRoutes);

export default router;
