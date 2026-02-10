import {
  createNewsletter,
  updateNewsletter,
  getNewsletterById,
  listNewsletters,
} from "../models/newsletters.model.js";

import { renderNewsletterHtml } from "../services/newsletterRender.service.js";
import { sendMail } from "../services/mailer.service.js";

// envoi / programmation
import {
  lockNewsletterForSending,
  markNewsletterScheduled,
  markNewsletterSent,
  markNewsletterDraft,
} from "../models/newsletterDeliveries.model.js";
import { sendNewsletterToAllActive } from "../services/newsletterSend.service.js";

export async function adminListNewsletters(req, res) {
  const status = String(req.query?.status || "all");
  const limit = Number(req.query?.limit || 50);
  const offset = Number(req.query?.offset || 0);

  const items = await listNewsletters({ status, limit, offset });
  return res.json({ items });
}

export async function adminCreateNewsletter(req, res) {
  const subject = String(req.body?.subject || "").trim();
  if (!subject) return res.status(400).json({ error: "Subject manquant" });

  const title = String(req.body?.title || "").trim();
  const backgroundColor = String(req.body?.background_color || "#ffffff");
  const contentJson = req.body?.content_json || { blocks: [] };

  const id = await createNewsletter({
    subject,
    title,
    contentJson,
    backgroundColor,
  });

  return res.status(201).json({ id });
}

export async function adminGetNewsletter(req, res) {
  const id = Number(req.params.id);
  const row = await getNewsletterById(id);
  if (!row) return res.status(404).json({ error: "Newsletter introuvable" });
  return res.json(row);
}

export async function adminUpdateNewsletter(req, res) {
  const id = Number(req.params.id);
  const subject = String(req.body?.subject || "").trim();
  if (!subject) return res.status(400).json({ error: "Subject manquant" });

  const title = String(req.body?.title || "").trim();
  const backgroundColor = String(req.body?.background_color || "#ffffff");
  const contentJson = req.body?.content_json || { blocks: [] };
  const status = String(req.body?.status || "draft");
  const scheduledAt = req.body?.scheduled_at || null;

  await updateNewsletter(id, {
    subject,
    title,
    contentJson,
    backgroundColor,
    status,
    scheduledAt,
  });

  return res.json({ message: "OK" });
}

export async function adminPreviewNewsletter(req, res) {
  const id = Number(req.params.id);
  const row = await getNewsletterById(id);
  if (!row) return res.status(404).send("Not found");

  const content =
    typeof row.content_json === "string"
      ? JSON.parse(row.content_json)
      : row.content_json;

  const html = renderNewsletterHtml({
    subject: row.subject,
    blocks: content?.blocks || [],
    background: row.background_color || "#ffffff",
    unsubscribeUrl: "http://localhost:5173/newsletter/unsubscribe?token=TEST",
  });

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.send(html);
}

export async function adminSendTestNewsletter(req, res) {
  const id = Number(req.params.id);
  const to = String(req.body?.to || "").trim().toLowerCase();
  if (!to) return res.status(400).json({ error: "Champ to manquant" });

  const row = await getNewsletterById(id);
  if (!row) return res.status(404).json({ error: "Newsletter introuvable" });

  const content =
    typeof row.content_json === "string"
      ? JSON.parse(row.content_json)
      : row.content_json;

  const html = renderNewsletterHtml({
    subject: row.subject,
    blocks: content?.blocks || [],
    background: row.background_color || "#ffffff",
    unsubscribeUrl: "http://localhost:5173/newsletter/unsubscribe?token=TEST",
  });

  await sendMail({
    to,
    subject: row.subject,
    text: "Version HTML disponible.",
    html,
  });

  return res.json({ message: "Test envoyé (check Mailtrap)" });
}

/**
 *  Programmer une newsletter
 * Body: { scheduled_at: "YYYY-MM-DD HH:mm:ss" } ou ISO
 */
export async function adminScheduleNewsletter(req, res) {
  const id = Number(req.params.id);
  const scheduledAt = req.body?.scheduled_at;

  if (!scheduledAt) {
    return res.status(400).json({ error: "scheduled_at manquant" });
  }

  await markNewsletterScheduled(id, scheduledAt);
  return res.json({ message: "Programmée " });
}

/**
 *  Annuler la programmation
 */
export async function adminCancelSchedule(req, res) {
  const id = Number(req.params.id);
  await markNewsletterDraft(id);
  return res.json({ message: "Programmation annulée " });
}

/**
 *  Envoyer maintenant à tous les abonnés actifs
 */
export async function adminSendNow(req, res) {
  const id = Number(req.params.id);

  // lock anti double envoi
  const locked = await lockNewsletterForSending(id);
  if (!locked) {
    return res.status(409).json({ error: "Déjà en cours / déjà envoyé" });
  }

  await sendNewsletterToAllActive(id);
  await markNewsletterSent(id);

  return res.json({ message: "Envoi terminé ✅" });
}
