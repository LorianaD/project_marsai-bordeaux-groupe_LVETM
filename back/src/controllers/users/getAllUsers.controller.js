import { getAllUsersService } from "../../services/users/getAllUsers.service.js";

/*=================================================
  controller pour récupérer tous les utilisateurs
====================================================*/
export async function getAllUsersController(req, res, next) {
    try {
        const users = await getAllUsersService();
        res.json({ success: true, users });
    } catch (error) {
        next(error);
    }
}