import { Router } from "express";
import { pool } from "../db/index.js";

const router = Router();

router.post("/contact", async (req, res, next) => {
  try {
    const { name, last_name, subject, email, message } = req.body || {};

    if (!name || !last_name || !subject || !email || !message) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const sql = `
      INSERT INTO contact_messages (name, last_name, subject, email, message)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      name,
      last_name,
      subject,
      email,
      message,
    ]);

    res.status(201).json({ ok: true, id: result.insertId });
  } catch (err) {
    next(err);
  }
});

export default router;
