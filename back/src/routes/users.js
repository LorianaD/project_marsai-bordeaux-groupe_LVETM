import { Router } from "express";
import registerController from '../controllers/users/register.controller.js'

const router = Router();

// routes en get
// router.get("/", profilController);


// route en post
router.post("/admin/register", registerController);
// router.post("/login", loginController);


export default router;