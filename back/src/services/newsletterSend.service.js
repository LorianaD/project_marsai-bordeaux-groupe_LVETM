import { getNewsletterById } from "../models/newsletters.model.js";
import { listActiveSubscribersBatch } from "../models/newsletter.model.js";
import { insertDelivery } from "../models/newsletterDeliveries.model.js";
import { renderNewsletterHtml } from "./newsletterRender.service.js";
import { sendMail } from "./mailer.service.js";

const APP_URL = process.env.APP_URL || "http://localhost:5173";

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
      const unsubscribeUrl = `${APP_URL}/newsletter/unsubscribe?token=${encodeURIComponent(sub.unsubscribe_token)}`;

      const html = renderNewsletterHtml({
        subject: nl.subject,
        blocks: content?.blocks || [],
        background: nl.background_color || "#ffffff",
        unsubscribeUrl,
      });

      try {
        await sendMail({
          to: sub.email,
          subject: nl.subject,
          text: "Newsletter MarsAI",
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
