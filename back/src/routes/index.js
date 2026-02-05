import { Router } from "express";
// import { testController } from "../controllers/test.controller.js";
import usersRouter from "./users.js";
import eventsRouter from "./eventsAdmin.js";
import videosRouter from "./videos.js";
<<<<<<< HEAD

import contactRouter from "./contact.js";

import partner from "./partner.js";

import newsletterRoutes from "./newsletter.routes.js";
=======
import contactRouter from "./contact.js"; 
import partnerRouter from "./partner.js";
>>>>>>> 264fb8434436467bad861c64101a158dad94a9da

const router = Router();

// router.get("/test", testController);
router.use("/users", usersRouter);
router.use("/videos", videosRouter);
router.use("/events", eventsRouter);
<<<<<<< HEAD
router.use("/partner", partner);

router.use("/", contactRouter);

router.use("/", newsletterRoutes);

=======
router.use("/partner", partnerRouter)
router.use("/contact", contactRouter);

>>>>>>> 264fb8434436467bad861c64101a158dad94a9da
export default router;
