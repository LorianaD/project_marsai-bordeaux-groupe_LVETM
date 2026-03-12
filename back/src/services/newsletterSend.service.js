import fs from "fs/promises";
import path from "path";
import { getNewsletterById } from "../models/newsletters.model.js";
import { listActiveSubscribersBatch } from "../models/newsletter.model.js";
import { insertDelivery } from "../models/newsletterDeliveries.model.js";
import { renderNewsletterHtml } from "./newsletterRender.service.js";
import { sendMail } from "./mailer.service.js";

const APP_URL = process.env.APP_URL || "http://localhost:5173";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// ex: sur 1000 mails , on les decoupe en lots de 200 mail,
// pas tout d'un  coup pour éviter de surcharger le serveur ou de se faire bloquer.
const BATCH_LIMIT = 200;
const CONCURRENCY = 5; //dans le lot de 200, on en envoie 5 en même temps.

// gère la langue fr-eng
function normalizeLocale(locale) {
  const l = String(locale || "")
    .trim()
    .toLowerCase();
  if (l === "fr" || l.startsWith("fr-")) return "fr";
  return "en";
}

function subjectForLocale(nl, locale) {
  // si tu as des sujets différents par langue, adapte ici
  if (normalizeLocale(locale) === "fr") return nl.subject;
  return nl.subject;
}

function textForLocale(locale) {
  return normalizeLocale(locale) === "fr"
    ? "Newsletter MarsAI"
    : "MarsAI Newsletter";
}

function guessMimeFromExt(ext) {
  const e = ext.toLowerCase();
  if (e === ".png") return "image/png";
  if (e === ".webp") return "image/webp";
  if (e === ".gif") return "image/gif";
  if (e === ".svg") return "image/svg+xml";
  return "image/jpeg";
}

function tryExtractUploadsPath(src) {
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

/*** Créer une fonction qui récupère une image dans /uploads,
 * l’intègre directement dans le code sous forme de texte, et la garde en mémoire pour ne pas la recharger plusieurs fois.*/
function makeUploadsInliner({ uploadsDir }) {
  /** @type {Map<string, Promise<string|null>>} */
  const dataUrlCache = new Map();

  //On utilise cette fonction pour pouvoir intégrer directement les images dans le code (par exemple dans une newsletter)
  //sans dépendre d’un fichier externe, éviter des problèmes de chargement d’images,
  //et améliorer les performances grâce au cache qui empêche de relire le fichier plusieurs fois.
  async function fileToDataUrl(filePath) {
    if (dataUrlCache.has(filePath)) return dataUrlCache.get(filePath);

    const p = (async () => {
      try {
        const ext = path.extname(filePath) || ".jpg";
        const mime = guessMimeFromExt(ext);

        const buf = await fs.readFile(filePath);
        const b64 = buf.toString("base64");
        return `data:${mime};base64,${b64}`;
      } catch {
        return null;
      }
    })();

    dataUrlCache.set(filePath, p);
    return p;
  }

  // transforme l'imag een string pour l'integrer à la newsletter
  async function inlineUploadsAsBase64(html) {
    if (!html) return html;

    const imgTagRe = /<img([^>]*?)\ssrc=["']([^"']+)["']([^>]*?)>/gi;

    /** @type {{ start:number, end:number, before:string, src:string, after:string }[]} */
    const matches = [];
    let m;
    while ((m = imgTagRe.exec(html)) !== null) {
      matches.push({
        start: m.index,
        end: m.index + m[0].length,
        before: m[1],
        src: m[2],
        after: m[3],
      });
    }

    if (!matches.length) return html;

    // Prépare toutes les substitutions
    const replacements = await Promise.all(
      matches.map(async (it) => {
        const uploadsPath = tryExtractUploadsPath(it.src);
        if (!uploadsPath) return null;

        const rel = uploadsPath.replace("/uploads/", "");
        const filePath = path.join(uploadsDir, rel);

        const dataUrl = await fileToDataUrl(filePath);
        if (!dataUrl) return null;

        return {
          start: it.start,
          end: it.end,
          value: `<img${it.before} src="${dataUrl}"${it.after}>`,
        };
      }),
    );

    // Reconstruit la string
    let out = "";
    let last = 0;

    for (let i = 0; i < matches.length; i++) {
      const rep = replacements[i];
      const original = matches[i];

      out += html.slice(last, original.start);
      out += rep ? rep.value : html.slice(original.start, original.end);
      last = original.end;
    }
    out += html.slice(last);

    return out;
  }

  return { inlineUploadsAsBase64 };
}

/**Petite util: exécute des tâches avec une concurrence limitée*/
async function runWithConcurrency(items, concurrency, worker) {
  const results = [];
  let idx = 0;

  async function runner() {
    while (true) {
      const cur = idx++;
      if (cur >= items.length) break;
      results[cur] = await worker(items[cur], cur);
    }
  }

  const n = Math.max(1, Math.min(concurrency, items.length));
  await Promise.all(Array.from({ length: n }, () => runner()));
  return results;
}

export async function sendNewsletterToAllActive(newsletterId) {
  const nl = await getNewsletterById(newsletterId);
  if (!nl) throw new Error("Newsletter introuvable");

  const content =
    typeof nl.content_json === "string"
      ? JSON.parse(nl.content_json)
      : nl.content_json;

  const { inlineUploadsAsBase64 } = makeUploadsInliner({
    uploadsDir: UPLOADS_DIR,
  });

  let offset = 0;
  const limit = BATCH_LIMIT;

  // Cache par locale pour éviter de rerender + re-inline à chaque abonné
  /** @type {Map<string, { subject: string, html: string, text: string }>} */
  const renderedByLocale = new Map();

  while (true) {
    const batch = await listActiveSubscribersBatch({ limit, offset });
    if (!batch.length) break;

    await runWithConcurrency(batch, CONCURRENCY, async (sub) => {
      const locale = normalizeLocale(sub.locale);

      const unsubscribeUrl = `${APP_URL}/newsletter/unsubscribe?token=${encodeURIComponent(
        sub.unsubscribe_token,
      )}`;

      // Prépare template pour cette locale (1 seule fois)
      let cached = renderedByLocale.get(locale);
      if (!cached) {
        const subject = subjectForLocale(nl, locale);

        // HTML "générique" (sans token)
        const rendered = renderNewsletterHtml({
          subject,
          blocks: content?.blocks || [],
          background: nl.background_color || "#ffffff",
          unsubscribeUrl: "__UNSUB_PLACEHOLDER__",
          locale,
        });

        // Inline /uploads (1 seule fois)
        const htmlWithInlinedImages = await inlineUploadsAsBase64(rendered);

        cached = {
          subject,
          html: htmlWithInlinedImages,
          text: textForLocale(locale),
        };
        renderedByLocale.set(locale, cached);
      }

      // Remplace juste l’unsubscribe,Le contenu de la newsletter est le même pour tout le monde
      //Mais le lien de désinscription est unique pour chaque personne
      const html = cached.html.replace("__UNSUB_PLACEHOLDER__", unsubscribeUrl);

      try {
        await sendMail({
          to: sub.email,
          subject: cached.subject,
          text: cached.text,
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
    });

    offset += batch.length;
  }
}
