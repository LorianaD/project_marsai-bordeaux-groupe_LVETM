import { isAdmin, isSuperAdmin, verifyToken } from "../utils/isAdmin.js";
import { Router } from "express";
import createRegisterController from '../controllers/users/register.controller.js';
import { loginController } from '../controllers/users/login.controller.js';
import { getAllUsersController } from "../controllers/users/getAllUsers.controller.js";
import { updateUserRoleController } from "../controllers/users/updateUserRole.controller.js";
import { deleteUserController } from "../controllers/users/deleteUser.controller.js";

const router = Router();

/* ================
   Routes GET
================ */
router.get('/', verifyToken, isAdmin, getAllUsersController);

/* ================================
   Routes POST (register par rôle)
=============================== */
router.post('/superAdmin/register', verifyToken, isSuperAdmin, createRegisterController({ fixedRole:'superadmin'}));
router.post('/admin/register', verifyToken, isSuperAdmin, createRegisterController({ fixedRole:'admin'}));
router.post('/selector/register', verifyToken, isAdmin, createRegisterController({ fixedRole:'selector'}));
router.post('/login', loginController);

/* ==================
   Route PUT role
================== */
router.put('/:id/role', verifyToken, isSuperAdmin, updateUserRoleController);

/* ==================
   Route DELETE user
================== */
router.delete('/:id', verifyToken, isSuperAdmin, deleteUserController)



export default router