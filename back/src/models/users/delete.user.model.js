import { pool } from "../../db/index.js";

// supprimer un user
async function deleteUser(id) {
    const query = `DELETE FROM users WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    return result;
}

export default deleteUser;