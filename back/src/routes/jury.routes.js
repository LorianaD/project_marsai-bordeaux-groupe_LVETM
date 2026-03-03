import { Router } from "express";
import GetAllJuryController from "../controllers/jury/GetAllJury.controller.js";
import CreateJuryController from "../controllers/jury/CreateJury.controller.js";
import UpdateJuryController from "../controllers/jury/UpdateJury.controller.js";
import DeleteJuryController from "../controllers/jury/DeleteJury.controller.js";
import { uploadJury } from "../middlewares/uploadJury.js";

const router = Router();

router.get("/", GetAllJuryController);
router.post("/", uploadJury.single("img"), CreateJuryController);
router.put("/:id", uploadJury.single("img"), UpdateJuryController);
router.delete("/:id", DeleteJuryController);

export default router;
