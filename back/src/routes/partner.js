import { Router } from "express";

import uploadPartner from "../middlewares/partnerMiddleware.js";

import AddPartnerController from "../controllers/partner/AddPartner.controller.js";
import GetAllPartnerController from "../controllers/partner/GetAllPartner.controller.js";
import UpdatePartnerController from "../controllers/partner/UpdatePartner.controller.js";
import GetOnePartnerController from "../controllers/partner/GetOnePartner.controller.js";
import DeletePartnerController from "../controllers/partner/DeletePartner.controller.js";
//import du middleware zod
import { validate } from "../middlewares/zod/zodValidator.js";
//import des schémas zod
import { createPartnerSchema, filePartnerImageSchema, optionalFilePartnerImageSchema } from "../zodSchema/zodIndex.js";

const router = Router();

// routes en get
router.get("/", GetAllPartnerController);
router.get("/:id", GetOnePartnerController);

// route en post
router.post("/", uploadPartner.single("img"), validate([createPartnerSchema, filePartnerImageSchema] ,{ includeFile: true }), AddPartnerController);

// route put pour l'update
router.put("/:id", uploadPartner.single("file"), validate([createPartnerSchema, optionalFilePartnerImageSchema] ,{ includeFile: true }), UpdatePartnerController);

// route DELETE pour delete
router.delete("/:id", DeletePartnerController);

export default router;