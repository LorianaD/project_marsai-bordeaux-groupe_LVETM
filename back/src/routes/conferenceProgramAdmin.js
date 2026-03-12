import { Router } from "express";
import {
  getProgramAdmin,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/conferenceProgram/ConferenceProgram.js";
import { validate } from "../middlewares/zod/zodValidator.js";
import { conferenceProgramSchema } from "../zodSchema/conferenceProgramValidationSchema.js";

const router = Router();
router.get("/", getProgramAdmin);
router.post("/",validate([conferenceProgramSchema]), createItem);
router.put("/:id",validate([conferenceProgramSchema]), updateItem);
router.delete("/:id", deleteItem);
export default router;