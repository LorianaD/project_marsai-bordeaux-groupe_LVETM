import { pool } from "../db/index.js";

export async function lockNewsletterForSending(newsletterId) {
  // Passe scheduled -> sending, une seule fois (lock simple)
  const [res] = await pool.execute(
    `UPDATE newsletters
     SET status='sending'
     WHERE id=? AND status IN ('scheduled','draft')`,
    [newsletterId],
  );
  return res.affectedRows > 0;
}

export async function markNewsletterScheduled(newsletterId, scheduledAt) {
  const [res] = await pool.execute(
    `UPDATE newsletters
     SET status='scheduled', scheduled_at=?
     WHERE id=?`,
    [scheduledAt, newsletterId],
  );
  return res.affectedRows;
}

export async function markNewsletterSent(newsletterId) {
  const [res] = await pool.execute(
    `UPDATE newsletters
     SET status='sent', sent_at=NOW()
     WHERE id=?`,
    [newsletterId],
  );
  return res.affectedRows;
}

export async function markNewsletterDraft(newsletterId) {
  const [res] = await pool.execute(
    `UPDATE newsletters
     SET status='draft', scheduled_at=NULL
     WHERE id=?`,
    [newsletterId],
  );
  return res.affectedRows;
}

export async function insertDelivery({
  newsletterId,
  subscriberId,
  email,
  status,
  errorMessage,
}) {
  const [res] = await pool.execute(
    `
    INSERT INTO newsletter_deliveries (newsletter_id, subscriber_id, email, status, error_message)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      status=VALUES(status),
      error_message=VALUES(error_message),
      sent_at=NOW()
    `,
    [newsletterId, subscriberId, email, status, errorMessage || null],
  );
  return res.affectedRows;
}

export async function deliveriesStats(newsletterId) {
  const [rows] = await pool.execute(
    `
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN status='sent' THEN 1 ELSE 0 END) AS sent,
      SUM(CASE WHEN status='failed' THEN 1 ELSE 0 END) AS failed
    FROM newsletter_deliveries
    WHERE newsletter_id=?
    `,
    [newsletterId],
  );
  return rows?.[0] || { total: 0, sent: 0, failed: 0 };
}
