import { Router } from "express";
import AddPartner from "../controllers/partner/AddPartner.controller.js";
// import { GetPartnerController } from "../controllers/";

const router = Router();

// routes en get
// router.get("/", partnerController);

// route en post
router.post("/", AddPartner);

export default router;