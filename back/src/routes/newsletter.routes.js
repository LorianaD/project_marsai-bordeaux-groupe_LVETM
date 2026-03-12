import { Router } from "express";
import { subscribe, confirm, unsubscribe } from "../controllers/newsletter.controller.js";
//import du middleware zod
import { validate } from "../middlewares/zod/zodValidator.js";
//import du schéma zod
import { emailSchema } from "../zodSchema/zodIndex.js";
import { consentSchema } from "../zodSchema/consentValidationSchema.js";

const router = Router();

router.post("/", validate([consentSchema, emailSchema]), subscribe);
router.get("/confirm", confirm);
router.get("/unsubscribe", unsubscribe);

export default router;
