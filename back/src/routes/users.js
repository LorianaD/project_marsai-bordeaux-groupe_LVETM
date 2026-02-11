import { isAdmin, isSuperAdmin, verifyToken } from "../utils/isAdmin.js";
import { Router } from "express";
import createRegisterController from '../controllers/users/register.controller.js'
import { loginController } from '../controllers/users/login.controller.js'

const router = Router();

// routes en get
// router.get("/", profilController);
;


// route en post pour chaque role
router.post('/superAdmin/register', verifyToken, isSuperAdmin, createRegisterController({ fixedRole:'superadmin'}))
router.post('/admin/register', verifyToken, isAdmin, createRegisterController({ fixedRole:'admin'}));
router.post('/selector/register', verifyToken, isAdmin, createRegisterController({ fixedRole:'selector'}));
router.post('/login', loginController);

// router.post("/admin/register", registerController);
// router.post('/selector/register', registerController);
// router.post("/login", loginController);


export default router