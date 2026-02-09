import { Router } from "express";
import GetAllJuryController from "../controllers/jury/GetAllJury.controller.js";

const router = Router();

router.get("/", GetAllJuryController);

export default router;
