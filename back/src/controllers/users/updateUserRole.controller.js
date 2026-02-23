import { updateUserRoleService } from "../../services/users/updateUserRole.service.js";

/*==================================================
  Controller pour changer le role de l'utilisateur
==================================================*/
export async function updateUserRoleController(req, res, next) {
  try {
    const { id } = req.params;
    const { role } = req.body;
    await updateUserRoleService(id, role);
    res.json({
      success: true,
      message: "Rôle mis à jour",
    });
  } catch (error) {
    next(error);
  }
}
