import { Router } from "express";
import { getFaq } from "../controllers/faq/getAllFaq.controller.js";
import { deleteFaqController } from "../controllers/faq/deleteFaq.controller.js";
import { updateFaqController } from "../controllers/faq/updateFaq.controller.js";
import { addFaqController } from "../controllers/faq/addFaq.controller.js";
import { createFaqSchema } from "../zodSchema/zodIndex.js";
import { validate } from "../middlewares/zod/zodValidator.js";

const router = Router();

router.get("/", getFaq);
router.post("/", validate(createFaqSchema), addFaqController);
router.put("/:id", validate(createFaqSchema), updateFaqController);
router.delete("/:id", deleteFaqController);

export default router;