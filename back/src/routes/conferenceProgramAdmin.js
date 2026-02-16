import { Router } from "express";
import {
  getProgramAdmin,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/conferenceProgram/ConferenceProgram.js";

const router = Router();
router.get("/", getProgramAdmin);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
export default router;