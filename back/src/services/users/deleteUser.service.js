import deleteUser from "../../models/users/delete.user.model.js";

// service pour supprimer un user
export async function deleteUserService(id) {
    if (!id) {
        throw new Error("User ID is required");
        
    }

    const result = await deleteUser(id);

    if (result.affectedRows === 0) {
        throw new Error("User not found");
    }

    return result;
}