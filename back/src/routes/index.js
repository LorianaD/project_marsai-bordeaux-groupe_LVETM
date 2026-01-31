import { Router } from "express";
// import { testController } from "../controllers/test.controller.js";
import eventsRouter from "./eventsAdmin.js";
import videosRouter from "./videos.js";

const router = Router();

// router.get("/test", testController);
router.use("/videos", videosRouter);
router.use("/events", eventsRouter);

export default router;