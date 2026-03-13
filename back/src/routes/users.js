import { isAdmin, isSuperAdmin, verifyToken } from "../utils/isAdmin.js";
import { Router } from "express";
import createRegisterController from '../controllers/users/register.controller.js';
import { loginController } from '../controllers/users/login.controller.js';
import { getAllUsersController } from "../controllers/users/getAllUsers.controller.js";
import { updateUserRoleController } from "../controllers/users/updateUserRole.controller.js";
import { deleteUserController } from "../controllers/users/deleteUser.controller.js";
import { inviteController } from "../controllers/users/invite.controller.js";
import { registerWithInviteController } from "../controllers/users/registerWithInvite.controller.js";
//import du middleware zod
import { validate } from "../middlewares/zod/zodValidator.js";
//import des schémas zod
import { emailSchema, passwordSchema, createUserSchema, roleSchema } from "../zodSchema/zodIndex.js";

const router = Router();

/* ================
   Routes GET
================ */
router.get('/', verifyToken, isSuperAdmin, getAllUsersController);

/* ================================
   Routes POST (register par rôle)
=============================== */

router.post('/invite', verifyToken, isSuperAdmin, inviteController);
router.post('/register-with-invite', registerWithInviteController);
router.post('/superAdmin/register', verifyToken, isSuperAdmin, validate([emailSchema, passwordSchema, createUserSchema]),createRegisterController({ fixedRole:'superadmin'}));
router.post('/admin/register', verifyToken, isSuperAdmin, validate([emailSchema, passwordSchema, createUserSchema]),createRegisterController({ fixedRole:'admin'}));
router.post('/selector/register', verifyToken, isAdmin, validate([emailSchema, passwordSchema, createUserSchema]),createRegisterController({ fixedRole:'selector'}));
router.post('/login', validate([emailSchema, passwordSchema]), loginController);

/* ==================
   Route PUT role
================== */
router.put('/:id/role', verifyToken, isSuperAdmin, validate(roleSchema), updateUserRoleController);

/* ==================
   Route DELETE user
================== */
router.delete('/:id', verifyToken, isSuperAdmin, deleteUserController)



export default router