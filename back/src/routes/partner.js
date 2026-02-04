import { Router } from "express";
// import { validateCreatePartener } from "../middlewares/zod/validateCreatePartener.js";

import uploadPartner from "../middlewares/partnerMiddleware.js";

import AddPartner from "../controllers/partner/AddPartner.controller.js";
import GetAllPartnerController from "../controllers/partner/GetAllPartner.controller.js";
import UpdatePartner from "../controllers/partner/UpdatePartner.controller.js";

const router = Router();

// routes en get
router.get("/", GetAllPartnerController);

// route en post
router.post("/", uploadPartner.single("img"), AddPartner);

// route put pour l'update
router.put("/:id", UpdatePartner);

export default router;