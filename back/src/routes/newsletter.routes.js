import { Router } from "express";
import {
  subscribeEmail,
  unsubscribeEmail,
} from "../models/newsletter.model.js";

const router = Router();

const hits = new Map();
const WINDOW_MS = 60_000;
const MAX_HITS = 5;

function rateLimit(req, res, next) {
  const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
  const now = Date.now();

  const entry = hits.get(ip) || { count: 0, start: now };

  if (now - entry.start > WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }

  entry.count += 1;
  hits.set(ip, entry);

  if (entry.count > MAX_HITS) {
    return res
      .status(429)
      .json({ error: "Trop de tentatives, réessayez plus tard" });
  }

  next();
}

function isValidEmail(email) {
  const e = String(email || "")
    .trim()
    .toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

router.post("/newsletter", rateLimit, async (req, res) => {
  const email = String(req.body?.email || "")
    .trim()
    .toLowerCase();

  if (!email) return res.status(400).json({ error: "Email manquant" });
  if (!isValidEmail(email))
    return res.status(400).json({ error: "Email invalide" });

  await subscribeEmail(email);
  return res.status(201).json({ message: "Inscription réussie" });
});

router.post("/newsletter/unsubscribe", rateLimit, async (req, res) => {
  const email = String(req.body?.email || "")
    .trim()
    .toLowerCase();

  if (!email) return res.status(400).json({ error: "Email manquant" });
  if (!isValidEmail(email))
    return res.status(400).json({ error: "Email invalide" });

  const affected = await unsubscribeEmail(email);

  if (!affected) {
    return res.status(200).json({ message: "Déjà désabonné ou introuvable" });
  }

  return res.status(200).json({ message: "Désabonnement effectué" });
});

export default router;
