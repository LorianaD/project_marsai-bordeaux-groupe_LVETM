import { Router } from "express";
import { testController } from "../controllers/test.controller.js";
import eventsRouter from "./eventsAdmin.js";



const router = Router();

router.get("/test", testController);
router.use("/events", eventsRouter);

export default router;