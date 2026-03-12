import { register } from "../../services/users/register.service.js";
import { verifyInviteToken } from "../../services/users/invite.service.js";

/* ===================================
 finalise l'inscription d'un user
=================================== */
export async function registerWithInviteController(req, res) {
  try {
    const token = req.body.token;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;

    /* valide les champs du formulaire */
    if (!token) {
      return res.status(400).json({ error: "Token manquant" });
    }
    if (!firstname || !lastname || !password) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    /* verifie et decode le token */
    const result = verifyInviteToken(token);
    if (!result) {
      return res.status(400).json({ error: "Lien invalide ou expiré" });
    }

    const emailFromToken = result[0];
    const roleFromToken = result[1];

    const cleanFirstname = firstname.trim();
    const cleanLastname = lastname.trim();

    if (!cleanFirstname || !cleanLastname) {
      return res.status(400).json({ error: "Nom ou prénom invalide" });
    }

    const createdUser = await register(
      {
        email: emailFromToken,
        password: password,
        firstname: cleanFirstname,
        lastname: cleanLastname,
      },
      roleFromToken,
    );

    return res.status(201).json({
      success: true,
      message: "Compte créé avec invitation",
      user: createdUser,
    });
  } catch (error) {
    console.error("[registerWithInvite]", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'inscription avec invitation" });
  }
}
