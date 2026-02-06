import { Router } from "express";
import createRegisterController from '../controllers/users/register.controller.js'

const router = Router();

// routes en get
// router.get("/", profilController);


// route en post
router.post('/superAdmin/register', createRegisterController({ fixedRole:'superadmin'}))
router.post('/admin/register', createRegisterController({ fixedRole:'admin'}));
router.post('/selector/register', createRegisterController({ fixedRole:'selector'}));

// router.post("/admin/register", registerController);
// router.post('/selector/register', registerController);
// router.post("/login", loginController);


export default router