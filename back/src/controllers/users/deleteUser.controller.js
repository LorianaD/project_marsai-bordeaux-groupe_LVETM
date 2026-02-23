import { deleteUserService } from "../../services/users/deleteUser.service.js";

/*===========================
  Controller pour supprimer un utilisateur
============================*/
export async function deleteUserController(req, res, next) {
  try {
    const { id } = req.params;
    await deleteUserService(id);
    res.json({
      success: true,
      message: "Utilisateur supprimé",
    });
  } catch (error) {
    next(error)
  }
}
