import updateUserRole from "../../models/users/update.user.role.model.js";

// service pour changer les roles
const VALID_ROLES = ["admin", "selector", "superAdmin"];

export async function updateUserRoleService(id, role) {
    if (!id) {
        throw new Error("User ID is required");
    }

    if (!role || !VALID_ROLES.includes(role)) {
        throw new Error(`Invalid role. Must be one of: ${VALID_ROLES.join(", ")}`);
    }

    const result = await updateUserRole(id, role);

    if (result.affectedRows === 0) {
        throw new Error("User not found");
    }

    return result;
}