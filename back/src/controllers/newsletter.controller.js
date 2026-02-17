import { makeToken } from "../services/token.service.js";
import {
  upsertPendingSubscriber,
  confirmSubscriberByToken,
  unsubscribeByToken,
} from "../models/newsletter.model.js";
import { sendConfirmNewsletterEmail } from "../services/newsletterEmail.service.js";
import { getSubscriberLocale } from "../utils/subscriberLocale.js"; // ✅ NEW

function isValidEmail(email) {
  const e = String(email || "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export async function subscribe(req, res) {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const consent = req.body?.consent === true;

    if (!email) return res.status(400).json({ error: "Email manquant" });
    if (!isValidEmail(email))
      return res.status(400).json({ error: "Email invalide" });
    if (!consent) return res.status(400).json({ error: "Consentement requis" });

    // ✅ Detect country/locale (FR => fr, else en)
    const { country, locale } = getSubscriberLocale(req);

    const confirmToken = makeToken(32);
    const unsubscribeToken = makeToken(32);

    // expires in 24h
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const consentAt = new Date();

    await upsertPendingSubscriber({
      email,
      consentAt,
      confirmToken,
      confirmExpiresAt: expires,
      unsubscribeToken,
      country, // ✅ NEW
      locale, // ✅ NEW
    });

    const APP_URL = process.env.APP_URL || "http://localhost:5173";

    const confirmUrl = `${APP_URL}/newsletter/confirm?token=${encodeURIComponent(
      confirmToken,
    )}`;
    const unsubscribeUrl = `${APP_URL}/newsletter/unsubscribe?token=${encodeURIComponent(
      unsubscribeToken,
    )}`;

    // ✅ Pass locale to send FR/EN confirmation email
    await sendConfirmNewsletterEmail({
      to: email,
      confirmUrl,
      unsubscribeUrl,
      locale,
    });

    return res.status(201).json({
      message: "Vérifie ta messagerie : un email de confirmation a été envoyé.",
    });
  } catch (err) {
    console.error("newsletter.subscribe error:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function confirm(req, res) {
  try {
    const token = String(req.query?.token || "").trim();
    if (!token) return res.status(400).json({ error: "Token manquant" });

    const result = await confirmSubscriberByToken(token);

    if (!result.ok) {
      if (result.reason === "expired") {
        return res.status(400).json({ error: "Lien expiré" });
      }
      return res.status(400).json({ error: "Lien invalide" });
    }

    if (result.already) {
      return res.json({ message: "Déjà confirmé " });
    }

    return res.json({ message: "Inscription confirmée " });
  } catch (err) {
    console.error("newsletter.confirm error:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function unsubscribe(req, res) {
  try {
    const token = String(req.query?.token || "").trim();
    if (!token) return res.status(400).json({ error: "Token manquant" });

    const affected = await unsubscribeByToken(token);
    if (!affected) {
      return res.status(200).json({ message: "Déjà désabonné ou lien invalide" });
    }

    return res.json({ message: "Désinscription effectuée " });
  } catch (err) {
    console.error("newsletter.unsubscribe error:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
