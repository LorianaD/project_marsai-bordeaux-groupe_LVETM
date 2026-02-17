import { Router } from "express";
import nodemailer from "nodemailer";
import { pool } from "../db/index.js";

const router = Router();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT || 2525),
  secure: false, // false pour 2525/587 ; true uniquement pour 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Optionnel mais utile : vérifier SMTP au démarrage
transporter
  .verify()
  .then(() => console.log(" SMTP OK (Mailtrap prêt)"))
  .catch((err) => console.error(" SMTP KO:", err?.message || err));

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendReplyEmail({ to, subject, originalMessage, reply }) {
  const from = process.env.MAIL_FROM || "MarsAI <no-reply@marsai.local>";

  const text = `Bonjour,

Nous avons bien reçu ton message :
"${originalMessage}"

Réponse de l'équipe MarsAI :
"${reply}"

— MarsAI
`;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5">
      <p>Bonjour,</p>

      <p><strong>Nous avons bien reçu ton message :</strong></p>
      <blockquote style="margin:12px 0;padding:10px 12px;border-left:4px solid #ddd;background:#fafafa">
        ${escapeHtml(originalMessage)}
      </blockquote>

      <p><strong>Réponse de l'équipe MarsAI :</strong></p>
      <blockquote style="margin:12px 0;padding:10px 12px;border-left:4px solid #ddd;background:#fafafa">
        ${escapeHtml(reply)}
      </blockquote>

      <p>— MarsAI</p>
    </div>
  `;

  await transporter.sendMail({
    from,
    to,
    subject: `[MarsAI] Re: ${subject}`,
    text,
    html,
  });
}

// GET /api/contact/admin/messages
router.get("/messages", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
         id, name, last_name, subject, email, message, created_at,
         is_read, read_at, reply, replied_at, replied_by
       FROM contact_messages
       ORDER BY created_at DESC`,
    );

    res.json(rows);
  } catch (err) {
    console.error("Erreur GET messages:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /api/contact/admin/messages/:id/read
router.post("/messages/:id/read", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const [r] = await pool.query(
      `UPDATE contact_messages
       SET is_read = 1,
           read_at = COALESCE(read_at, NOW())
       WHERE id = ?`,
      [id],
    );

    if (r.affectedRows === 0) {
      return res.status(404).json({ error: "Message introuvable" });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Erreur POST read:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /api/contact/admin/messages/:id/reply
router.post("/messages/:id/reply", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const reply = String(req.body?.reply || "").trim();

    // replied_by optionnel (FK -> users.id), peut rester NULL
    const repliedByRaw = req.body?.replied_by;
    const repliedBy =
      repliedByRaw === undefined || repliedByRaw === null || repliedByRaw === ""
        ? null
        : Number(repliedByRaw);

    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }
    if (!reply) {
      return res.status(400).json({ error: "reply est requis" });
    }
    if (repliedBy !== null && !Number.isFinite(repliedBy)) {
      return res.status(400).json({ error: "replied_by invalide" });
    }

    // 1) récupérer le message original
    const [rows] = await pool.query(
      `SELECT id, email, subject, message
       FROM contact_messages
       WHERE id = ?`,
      [id],
    );

    const m = rows?.[0];
    if (!m) {
      return res.status(404).json({ error: "Message introuvable" });
    }

    // 2) update DB
    await pool.query(
      `UPDATE contact_messages
       SET reply = ?,
           replied_at = NOW(),
           replied_by = ?,
           is_read = 1,
           read_at = COALESCE(read_at, NOW())
       WHERE id = ?`,
      [reply, repliedBy, id],
    );

    // 3) envoi email (Mailtrap -> visible dans Inbox Mailtrap)
    // Si tu n'as pas de config mail, on ne bloque pas.
    if (
      process.env.MAIL_HOST &&
      process.env.MAIL_USER &&
      process.env.MAIL_PASS
    ) {
      await sendReplyEmail({
        to: m.email,
        subject: m.subject,
        originalMessage: m.message,
        reply,
      });
    } else {
      console.warn(
        "MAIL_HOST/MAIL_USER/MAIL_PASS manquant : réponse enregistrée en BDD mais email non envoyé.",
      );
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Erreur POST reply:", err);
    res.status(500).json({ error: "Erreur serveur", details: err.message });
  }
});

export default router;
