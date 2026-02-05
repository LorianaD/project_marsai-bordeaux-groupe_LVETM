import { Router } from "express";
// import { validateCreatePartener } from "../middlewares/zod/validateCreatePartener.js";

import uploadPartner from "../middlewares/partnerMiddleware.js";

import AddPartnerController from "../controllers/partner/AddPartner.controller.js";
import GetAllPartnerController from "../controllers/partner/GetAllPartner.controller.js";
import UpdatePartnerController from "../controllers/partner/UpdatePartner.controller.js";
import GetOnePartnerController from "../controllers/partner/GetOnePartner.controller.js";

const router = Router();

// routes en get
router.get("/", GetAllPartnerController);
router.get("/:id", GetOnePartnerController);

// route en post
router.post("/", uploadPartner.single("img"), AddPartnerController);

// route put pour l'update
router.put("/:id", uploadPartner.single("file"), UpdatePartnerController);

export default router;