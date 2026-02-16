import { Router } from "express";
import { pool } from "../db/index.js";

const router = Router();

/**
 * ==============================
 * GET /api/contact/admin/messages
 * ==============================
 * Récupère tous les messages (du + récent au + ancien)
 */
router.get("/messages", async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT *
      FROM contact_messages
      ORDER BY created_at DESC
      `,
    );

    res.json(rows);
  } catch (err) {
    console.error("Erreur GET messages:", err);
    next(err);
  }
});

/**
 * ==========================================
 * POST /api/contact/admin/messages/:id/read
 * ==========================================
 * Marque un message comme lu
 */
router.post("/messages/:id/read", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const [result] = await pool.query(
      `
      UPDATE contact_messages
      SET is_read = 1
      WHERE id = ?
      `,
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Message introuvable" });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Erreur POST read:", err);
    next(err);
  }
});

/**
 * ==========================================
 * POST /api/contact/admin/messages/:id/reply
 * ==========================================
 * Enregistre la réponse admin
 */
router.post("/messages/:id/reply", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { reply } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID invalide" });
    }

    if (!reply || !reply.trim()) {
      return res.status(400).json({ error: "Réponse vide" });
    }

    const [result] = await pool.query(
      `
      UPDATE contact_messages
      SET reply = ?, replied_at = NOW(), is_read = 1
      WHERE id = ?
      `,
      [reply, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Message introuvable" });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("Erreur POST reply:", err);
    next(err);
  }
});

export default router;
