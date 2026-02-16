import updateUserRole from "../../models/users/update.user.role.model.js";
import { pool } from "../../db/index.js";

// service pour changer les roles users
const VALID_ROLES = ["admin", "selector"];


// Vérifie que l'id est fourni
export async function updateUserRoleService(id, role) {
    if (!id) {
        throw new Error("User ID is required");
    }

    if (!role || !VALID_ROLES.includes(role)) {
        throw new Error(`Invalid role. Must be one of: ${VALID_ROLES.join(", ")}`);
    }

    // verifie si l'utilisateur ciblé est superadmin
    const[rows] = await pool.execute("SELECT role FROM users WHERE id = ?", [id]);
    if (rows.length > 0 && rows[0].role === "superadmin") {
        throw new Error("Cannot change the role of a superadmin");
    }

    const result = await updateUserRole(id, role);

    if (result.affectedRows === 0) {
        throw new Error("User not found");
    }

    return result;
}