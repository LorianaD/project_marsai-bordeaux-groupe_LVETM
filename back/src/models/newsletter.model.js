import { pool } from "../db/index.js";

export async function subscribeEmail(email) {
  const clean = String(email || "").trim().toLowerCase();

  const sql = `
    INSERT INTO newsletter_subscribers (email, unsubscribed_at)
    VALUES (?, NULL)
    ON DUPLICATE KEY UPDATE unsubscribed_at = NULL
  `;

  const [result] = await pool.execute(sql, [clean]);

  return result.affectedRows;
}

export async function unsubscribeEmail(email) {
  const clean = String(email || "").trim().toLowerCase();

  const sql = `
    UPDATE newsletter_subscribers
    SET unsubscribed_at = NOW()
    WHERE email = ?
      AND unsubscribed_at IS NULL
  `;

  const [result] = await pool.execute(sql, [clean]);
  return result.affectedRows;
}
