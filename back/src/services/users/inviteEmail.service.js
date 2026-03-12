import { sendMail } from "../mailer.service.js";

/* =============================================================
"to" adresse email du destinataire, function mail d'invitation
==============================================================*/
export async function sendInviteEmail(to, inviteUrl, role) {
  let roleLabel = "Selectionneur";
  if (role === "admin") {
    roleLabel = "Administrateur";
  }

  const subject = "Vous êtes invité à rejoindre MarsAI " + roleLabel;

  const text = "Bonjour,\n\n"
    + "Vous êtes invité à rejoindre MarsAI en tant que " + roleLabel + ".\n\n"
    + "Cliquez ici pour créer votre compte (lien valide 24h) :\n"
    + inviteUrl + "\n\n"
    + "- L'équipe MarsAI";

  const html = "<p>Bonjour,</p>"
    + "<p>Vous êtes invité à rejoindre MarsAI en tant que <strong>" + roleLabel + "</strong>.</p>"
    + "<p>Cliquez ici pour créer votre compte (lien valide 24h) :</p>"
    + "<p><a href=\"" + inviteUrl + "\">" + inviteUrl + "</a></p>"
    + "<p>- L'équipe MarsAI</p>";

  return sendMail({ to, subject, text, html });
}
