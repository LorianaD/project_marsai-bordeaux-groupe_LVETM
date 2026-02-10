import { Router } from "express";
import { getFaq } from "../controllers/faq/getAllFaq.Controller.js";
import { deleteFaq } from "../controllers/faq/deleteFaq.controller.js";


const router = Router();

router.get("/", getFaq);
router.delete("/:id", deleteFaq);

export default router;