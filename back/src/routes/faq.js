import { Router } from "express";
import { getFaq } from "../controllers/faq/faq.Controller.js";

const router = Router();

router.get("/", getFaq);

export default router;