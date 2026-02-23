import { Router } from "express";
import { createContactMessage } from "../models/contact.model.js";

const router = Router();

// Enregistre un message envoyé via le formulaire contact
router.post("/", async (req, res, next) => {
  try {
    const { name, last_name, subject, email, message } = req.body || {};

    if (!name || !last_name || !subject || !email || !message) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const id = await createContactMessage({
      name,
      last_name,
      subject,
      email,
      message,
    });

    res.status(201).json({ ok: true, id });
  } catch (err) {
    next(err);
  }
});

export default router;