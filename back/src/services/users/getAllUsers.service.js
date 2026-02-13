import getAllUsers from "../../models/users/get.all.users.model.js";


// // Récupère et retourne tous les utilisateurs au controller
export async function getAllUsersService() {
    const users = await getAllUsers();
    return users;
}

