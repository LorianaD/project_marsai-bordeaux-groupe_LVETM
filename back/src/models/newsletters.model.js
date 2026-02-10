import { pool } from "../db/index.js";

export async function createNewsletter({
  subject,
  title,
  contentJson,
  backgroundColor,
}) {
  const sql = `
    INSERT INTO newsletters (subject, title, content_json, background_color, status)
    VALUES (?, ?, ?, ?, 'draft')
  `;
  const [res] = await pool.execute(sql, [
    subject,
    title || null,
    JSON.stringify(contentJson),
    backgroundColor || null,
  ]);
  return res.insertId;
}

export async function updateNewsletter(
  id,
  { subject, title, contentJson, backgroundColor, status, scheduledAt },
) {
  const sql = `
    UPDATE newsletters
    SET subject=?, title=?, content_json=?, background_color=?, status=?, scheduled_at=?
    WHERE id=?
  `;
  const [res] = await pool.execute(sql, [
    subject,
    title || null,
    JSON.stringify(contentJson),
    backgroundColor || null,
    status || "draft",
    scheduledAt || null,
    id,
  ]);
  return res.affectedRows;
}

export async function getNewsletterById(id) {
  const [rows] = await pool.execute(
    `SELECT * FROM newsletters WHERE id=? LIMIT 1`,
    [id],
  );
  return rows?.[0] || null;
}

export async function listNewsletters({
  status = "all",
  limit = 50,
  offset = 0,
} = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
  const safeOffset = Math.max(Number(offset) || 0, 0);

  let where = "1=1";

  if (status === "draft") {
    where += " AND status='draft'";
  } else if (status === "scheduled") {
    where += " AND status='scheduled'";
  } else if (status === "sending") {
    where += " AND status='sending'";
  } else if (status === "sent") {
    where += " AND status='sent'";
  }

  const sql = `
    SELECT
      id,
      subject,
      status,
      created_at,
      scheduled_at,
      sent_at
    FROM newsletters
    WHERE ${where}
    ORDER BY created_at DESC
    LIMIT ${safeOffset}, ${safeLimit}
  `;

  const [rows] = await pool.execute(sql);
  return rows;
}

export async function markNewsletterSent(id) {
  const [res] = await pool.execute(
    `UPDATE newsletters SET status='sent', sent_at=NOW() WHERE id=?`,
    [id],
  );
  return res.affectedRows;
}
