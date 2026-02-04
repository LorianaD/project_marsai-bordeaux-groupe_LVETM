import { Router } from "express";
// import { validateCreatePartener } from "../middlewares/zod/validateCreatePartener.js";

import uploadPartner from "../middlewares/partnerMiddleware.js";

import AddPartner from "../controllers/partner/AddPartner.controller.js";
// import { GetPartnerController } from "../controllers/";

const router = Router();

// routes en get
// router.get("/", partnerController);

// route en post
router.post("/", uploadPartner.single("img"), AddPartner);

export default router;