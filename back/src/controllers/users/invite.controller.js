import { pool } from "../../db/index.js";
import { generateInviteToken } from "../../services/users/invite.service.js";
import { sendInviteEmail } from "../../services/users/inviteEmail.service.js";

/* ========================
invite un user par email
========================= */
export async function inviteController(req, res) {
  try {
    const email = req.body.email;
    const role = req.body.role;

    /* vérifie si l'email existe et le type */
    if (!email) {
      return res.status(400).json({ error: "Email requis" });
    }
    if (typeof email !== "string") {
      return res.status(400).json({ error: "Email invalide" });
    }

    /* nettoyer et valider email*/
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail.length === 0) {
      return res.status(400).json({ error: "Email requis" });
    }

    /* Nettoyer et vérifier le role autorisé*/
    const cleanRole = role ? String(role).trim().toLowerCase() : "";
    if (cleanRole !== "admin" && cleanRole !== "selector") {
      return res
        .status(400)
        .json({ error: "Rôle invalide (admin ou selector)" });
    }

    /* vérifie si l'user existe deja */
    const sql = "SELECT id FROM users WHERE email = ?";
    const params = [cleanEmail];

    const result = await pool.execute(sql, params);
    const rows = result[0];

    if (rows.length > 0) {
      return res.status(400).json({ error: "Cet email est deja utilisé" });
    }

    /* génère un token d'invitation */
    const token = generateInviteToken(cleanEmail, cleanRole);

    if (!token) {
      return res.status(500).json({ error: "Impossible de générer le token" });
    }

    /* url du lien d'incription */
    const appUrl = process.env.APP_URL || "http://localhost:5173";
    const inviteUrl = appUrl + "/register?token=" + encodeURIComponent(token);

    if (!inviteUrl) {
      return res
        .status(500)
        .json({ error: "Impossible de construire le lien" });
    }

    /* envoyer l'email au destinataire */
    await sendInviteEmail(cleanEmail, inviteUrl, cleanRole);

    return res.status(200).json({
      success: true,
      message: "Invitation envoyée à " + cleanEmail,
    });

  } catch (err) {
    console.error("[invite]", err);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'envoi de l'invitation" });
  }
}
