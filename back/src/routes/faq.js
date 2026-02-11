import { Router } from "express";
import { getFaq } from "../controllers/faq/getAllFaq.controller.js";
import { deleteFaqController } from "../controllers/faq/deleteFaq.controller.js";
import { updateFaqController } from "../controllers/faq/updateFaq.controller.js";


const router = Router();

router.get("/", getFaq);
router.put("/", updateFaqController);
router.delete("/:id", deleteFaqController);

export default router;