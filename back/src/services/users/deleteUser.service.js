import deleteUser from "../../models/users/delete.user.model.js";
import { pool } from "../../db/index.js";

// service pour supprimer un user
export async function deleteUserService(id) {
  if (!id) {
    throw new Error("User ID is required");
  }

// verifie si le user est superadmin 
const [rows] = await pool.execute("SELECT role FROM users WHERE id = ?", [id]);
if (rows.length > 0 && rows[0].role === "superadmin") {
    throw new Error("Cannot delete a superadmin");
    
}

  const result = await deleteUser(id);

  if (result.affectedRows === 0) {
    throw new Error("User not found");
  }

  return result;
}
