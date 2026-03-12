import { Router } from "express";
import { createContactMessage } from "../models/contact.model.js";
//import du middleware zod
import { validate } from "../middlewares/zod/zodValidator.js";
//import du schéma zod
import { contactSchema, emailSchema, createUserSnakeSchema } from "../zodSchema/zodIndex.js";

const router = Router();

// Enregistre un message envoyé via le formulaire contact
router.post("/", validate([contactSchema, emailSchema, createUserSnakeSchema]), async (req, res, next) => {
  try {
    const { name, last_name, subject, email, message } = req.body || {};

    //  Debug : voir les données reçues
    console.log(" Nouveau message contact reçu :", {
      name,
      last_name,
      subject,
      email,
      message,
    });

    if (!name || !last_name || !subject || !email || !message) {
      console.log(" Champs manquants");
      return res.status(400).json({ error: "Champs manquants" });
    }

    const id = await createContactMessage({
      name,
      last_name,
      subject,
      email,
      message,
    });

    console.log(" Message enregistré avec ID :", id);

    res.status(201).json({ ok: true, id });
  } catch (err) {
    console.error( "Erreur création message contact :", err);
    next(err);
  }
});

export default router;