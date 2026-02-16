import { Router } from "express";
import { getAllConferenceProgram } from "../controllers/conferenceProgram/ConferenceProgram.js";

const router = Router();
router.get("/", getAllConferenceProgram);
export default router;