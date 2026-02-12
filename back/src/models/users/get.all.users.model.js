import { pool } from "../../db/index.js";

// Récupère tous les utilisateurs 
async function getAllUsers() {
    const query = `SELECT id, email, name, last_name, role, created_at FROM users`;
    const [rows] = await pool.execute(query)
    return rows;
}

export default getAllUsers;