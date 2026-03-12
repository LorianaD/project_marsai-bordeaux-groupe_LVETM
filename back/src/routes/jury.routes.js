import { Router } from "express";
import GetAllJuryController from "../controllers/jury/GetAllJury.controller.js";
import CreateJuryController from "../controllers/jury/CreateJury.controller.js";
import UpdateJuryController from "../controllers/jury/UpdateJury.controller.js";
import DeleteJuryController from "../controllers/jury/DeleteJury.controller.js";
import { uploadJury } from "../middlewares/uploadJury.js";
//import du middleware zod
import { validate } from "../middlewares/zod/zodValidator.js";
//import des schémas zod
import { createUserJurySchema, createJurySchema, fileImageSchema, optionalFileImageSchema } from "../zodSchema/zodIndex.js";

const router = Router();

router.get("/", GetAllJuryController);
router.post("/", uploadJury.single("img"), validate([createUserJurySchema, createJurySchema, fileImageSchema] ,{ includeFile: true }), CreateJuryController);
router.put("/:id", uploadJury.single("img"), validate([createUserJurySchema, createJurySchema, optionalFileImageSchema] ,{ includeFile: true }), UpdateJuryController);
router.delete("/:id", DeleteJuryController);

export default router;
