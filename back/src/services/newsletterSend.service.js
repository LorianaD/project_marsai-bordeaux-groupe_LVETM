import fs from "fs";
import path from "path";
import { getNewsletterById } from "../models/newsletters.model.js";
import { listActiveSubscribersBatch } from "../models/newsletter.model.js";
import { insertDelivery } from "../models/newsletterDeliveries.model.js";
import { renderNewsletterHtml } from "./newsletterRender.service.js";
import { sendMail } from "./mailer.service.js";

const APP_URL = process.env.APP_URL || "http://localhost:5173";

/**
 * ✅ Convertit les <img src="/uploads/..."> ou <img src="http://.../uploads/...">
 * en <img src="data:image/...;base64,...."> pour que l'image parte dans l'email.
 *
 * IMPORTANT: adapte UPLOADS_DIR si ton dossier réel est ailleurs.
 */
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads"); // ex: back/public/uploads

function normalizeLocale(locale) {
  const l = String(locale || "").trim().toLowerCase();
  if (l === "fr" || l.startsWith("fr-")) return "fr";
  return "en";
}

function subjectForLocale(nl, locale) {
  if (normalizeLocale(locale) === "fr") return nl.subject;
  return nl.subject;
}

function textForLocale(locale) {
  return normalizeLocale(locale) === "fr" ? "Newsletter MarsAI" : "MarsAI Newsletter";
}

function guessMimeFromExt(ext) {
  const e = ext.toLowerCase();
  if (e === ".png") return "image/png";
  if (e === ".webp") return "image/webp";
  if (e === ".gif") return "image/gif";
  return "image/jpeg";
}

function tryExtractUploadsPath(src) {
  // Supporte:
  //  - /uploads/xxx.jpg
  //  - http://localhost:3000/uploads/xxx.jpg
  //  - https://domain.tld/uploads/xxx.jpg
  if (!src) return null;

  if (src.startsWith("/uploads/")) return src;

  if (src.startsWith("http")) {
    try {
      const u = new URL(src);
      if (u.pathname.startsWith("/uploads/")) return u.pathname;
    } catch {
      return null;
    }
  }

  return null;
}

function inlineUploadsAsBase64(html) {
  if (!html) return html;

  return html.replace(
    /<img([^>]*?)\ssrc=["']([^"']+)["']([^>]*?)>/gi,
    (match, before, src, after) => {
      const uploadsPath = tryExtractUploadsPath(src);
      if (!uploadsPath) return match;

      // /uploads/xxx.jpg -> back/public/uploads/xxx.jpg
      const rel = uploadsPath.replace("/uploads/", "");
      const filePath = path.join(UPLOADS_DIR, rel);

      if (!fs.existsSync(filePath)) {
        // si introuvable, on laisse l'url telle quelle
        return match;
      }

      const ext = path.extname(filePath) || ".jpg";
      const mime = guessMimeFromExt(ext);

      const buf = fs.readFileSync(filePath);
      const b64 = buf.toString("base64");
      const dataUrl = `data:${mime};base64,${b64}`;

      return `<img${before} src="${dataUrl}"${after}>`;
    },
  );
}

export async function sendNewsletterToAllActive(newsletterId) {
  const nl = await getNewsletterById(newsletterId);
  if (!nl) throw new Error("Newsletter introuvable");

  const content =
    typeof nl.content_json === "string" ? JSON.parse(nl.content_json) : nl.content_json;

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

      const subject = subjectForLocale(nl, locale);

      // ✅ 1) HTML normal
      const rendered = renderNewsletterHtml({
        subject,
        blocks: content?.blocks || [],
        background: nl.background_color || "#ffffff",
        unsubscribeUrl,
        locale,
      });

      // ✅ 2) Adaptation: inline base64 des images /uploads
      const html = inlineUploadsAsBase64(rendered);

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
