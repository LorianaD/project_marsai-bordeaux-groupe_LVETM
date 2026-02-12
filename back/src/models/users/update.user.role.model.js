import { pool } from "../../db/index.js";

// Met à jour le rôle d’un utilisateur 
async function updateUserRole(id, role) {
    const query = `UPDATE users SET role = ? WHERE id = ?`;
    const [result] = await pool.execute(query, [role, id]);
    return result;
}

export default updateUserRole;