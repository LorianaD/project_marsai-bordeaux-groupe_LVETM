import { getNewsletterById } from "../models/newsletters.model.js";
import { listActiveSubscribersBatch } from "../models/newsletter.model.js";
import { insertDelivery } from "../models/newsletterDeliveries.model.js";
import { renderNewsletterHtml } from "./newsletterRender.service.js";
import { sendMail } from "./mailer.service.js";

const APP_URL = process.env.APP_URL || "http://localhost:5173";

function normalizeLocale(locale) {
  const l = String(locale || "")
    .trim()
    .toLowerCase();
  if (l === "fr" || l.startsWith("fr-")) return "fr";
  return "en";
}

// If you want different subjects per language, keep it here.
// Fallback: if you haven't created an English subject yet, we reuse nl.subject.
function subjectForLocale(nl, locale) {
  if (normalizeLocale(locale) === "fr") return nl.subject;
  return nl.subject; // you can replace later with nl.subject_en if you add it
}

function textForLocale(locale) {
  return normalizeLocale(locale) === "fr"
    ? "Newsletter MarsAI"
    : "MarsAI Newsletter";
}

export async function sendNewsletterToAllActive(newsletterId) {
  const nl = await getNewsletterById(newsletterId);
  if (!nl) throw new Error("Newsletter introuvable");

  const content =
    typeof nl.content_json === "string"
      ? JSON.parse(nl.content_json)
      : nl.content_json;

  let offset = 0;
  const limit = 200;

  while (true) {
    const batch = await listActiveSubscribersBatch({ limit, offset });
    if (!batch.length) break;

    for (const sub of batch) {
      const locale = normalizeLocale(sub.locale);
      const unsubscribeUrl = `${APP_URL}/newsletter/unsubscribe?token=${encodeURIComponent(
        sub.unsubscribe_token,
      )}`;

      // ✅ For now: same content blocks, but we can adapt strings inside templates later.
      // The important part: we now pass locale to the renderer so you can translate
      // header/footer (unsubscribe text, etc.) inside renderNewsletterHtml.
      const subject = subjectForLocale(nl, locale);

      const html = renderNewsletterHtml({
        subject,
        blocks: content?.blocks || [],
        background: nl.background_color || "#ffffff",
        unsubscribeUrl,
        locale, // ✅ NEW (update renderer to use it if needed)
      });

      try {
        await sendMail({
          to: sub.email,
          subject,
          text: textForLocale(locale),
          html,
        });

        await insertDelivery({
          newsletterId,
          subscriberId: sub.id,
          email: sub.email,
          status: "sent",
          errorMessage: null,
        });
      } catch (e) {
        await insertDelivery({
          newsletterId,
          subscriberId: sub.id,
          email: sub.email,
          status: "failed",
          errorMessage: e?.message || "send failed",
        });
      }
    }

    offset += batch.length;
  }
}
