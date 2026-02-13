import { Router } from "express";
import { subscribe, confirm, unsubscribe } from "../controllers/newsletter.controller.js";

const router = Router();

router.post("/", subscribe);
router.get("/confirm", confirm);
router.get("/unsubscribe", unsubscribe);

export default router;
