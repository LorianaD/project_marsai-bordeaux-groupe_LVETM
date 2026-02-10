import { sendMail } from "./mailer.service.js";

export async function sendConfirmNewsletterEmail({
  to,
  confirmUrl,
  unsubscribeUrl,
}) {
  const subject = "Confirme ton inscription à la newsletter MARS.AI";

  const text = `Confirme ton inscription : ${confirmUrl}\n\nSe désinscrire : ${unsubscribeUrl}`;
  const html = `
    <div style="font-family: sans-serif; line-height:1.5">
      <h2>Confirme ton inscription à MARS.AI</h2>
      <p>Merci ! Clique ici pour confirmer :</p>
      <p><a href="${confirmUrl}">Confirmer mon inscription</a></p>
      <hr/>
      <p style="font-size:12px;opacity:.8">
        Tu peux te désinscrire à tout moment :
        <a href="${unsubscribeUrl}">Se désinscrire</a>
      </p>
    </div>
  `;

  return sendMail({ to, subject, text, html });
}
