import deleteUser from "../../models/users/delete.user.model.js";
import { pool } from "../../db/index.js";

/*===================================
   Service pour supprimer un user
===================================*/
export async function deleteUserService(id) {
  if (!id) {
    throw new Error("L'ID utilisateur est requis");
  }

/*=====================================
   Vérifie si le user est superadmin 
=====================================*/
const [rows] = await pool.execute("SELECT role FROM users WHERE id = ?", [id]);
if (rows.length > 0 && rows[0].role === "superadmin") {
    throw new Error("Impossible de supprimer un superadmin");
    
}

  const result = await deleteUser(id);

  if (result.affectedRows === 0) {
    throw new Error("Utilisateur introuvable");
  }

  return result;
}
