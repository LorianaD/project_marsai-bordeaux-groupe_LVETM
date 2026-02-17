import { sendMail } from "./mailer.service.js";

function normalizeLocale(locale) {
  const l = String(locale || "")
    .trim()
    .toLowerCase();
  if (l === "fr" || l.startsWith("fr-")) return "fr";
  return "en";
}

export async function sendConfirmNewsletterEmail({
  to,
  confirmUrl,
  unsubscribeUrl,
  locale = "en", // ✅ NEW
}) {
  const lang = normalizeLocale(locale);

  const i18n =
    lang === "fr"
      ? {
          subject: "Confirme ton inscription à la newsletter MARS.AI",
          title: "Confirme ton inscription à MARS.AI",
          intro: "Merci ! Clique ici pour confirmer :",
          confirmCta: "Confirmer mon inscription",
          unsubscribeLabel: "Tu peux te désinscrire à tout moment :",
          unsubscribeCta: "Se désinscrire",
          textConfirm: "Confirme ton inscription :",
          textUnsubscribe: "Se désinscrire :",
        }
      : {
          subject: "Confirm your subscription to the MARS.AI newsletter",
          title: "Confirm your subscription to MARS.AI",
          intro: "Thank you! Click here to confirm:",
          confirmCta: "Confirm my subscription",
          unsubscribeLabel: "You can unsubscribe at any time:",
          unsubscribeCta: "Unsubscribe",
          textConfirm: "Confirm your subscription:",
          textUnsubscribe: "Unsubscribe:",
        };

  const text = `${i18n.textConfirm} ${confirmUrl}\n\n${i18n.textUnsubscribe} ${unsubscribeUrl}`;

  const html = `
    <div style="font-family: sans-serif; line-height:1.5">
      <h2>${i18n.title}</h2>
      <p>${i18n.intro}</p>
      <p>
        <a href="${confirmUrl}" style="display:inline-block;padding:10px 16px;background:#000;color:#fff;border-radius:8px;text-decoration:none;">
          ${i18n.confirmCta}
        </a>
      </p>
      <hr/>
      <p style="font-size:12px;opacity:.8">
        ${i18n.unsubscribeLabel}
        <a href="${unsubscribeUrl}">${i18n.unsubscribeCta}</a>
      </p>
    </div>
  `;

  return sendMail({ to, subject: i18n.subject, text, html });
}
