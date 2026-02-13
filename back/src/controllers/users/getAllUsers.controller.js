import { getAllUsersService } from "../../services/users/getAllUsers.service.js";

export async function getAllUsersController(req, res, next) {
    try {
        const users = await getAllUsersService();
        res.json({ success: true, users });
    } catch (error) {
        next(error);
    }
}