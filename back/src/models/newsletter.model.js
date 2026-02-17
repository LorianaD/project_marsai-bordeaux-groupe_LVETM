import { pool } from "../db/index.js";

/**
 * Create / update a subscriber as pending (double opt-in)
 * Stores country + locale (FR => fr, else en) when provided by the controller.
 */
export async function upsertPendingSubscriber({
  email,
  consentAt,
  confirmToken,
  confirmExpiresAt,
  unsubscribeToken,
  country = null,
  locale = "en",
}) {
  const cleanEmail = String(email || "")
    .trim()
    .toLowerCase();
  const cleanLocale = String(locale || "en")
    .trim()
    .toLowerCase()
    .slice(0, 5);
  const cleanCountry =
    country && String(country).trim()
      ? String(country).trim().toUpperCase().slice(0, 2)
      : null;

  const sql = `
    INSERT INTO newsletter_subscribers
      (email, country, locale, status, consent_at, confirm_token, confirm_expires_at, confirmed_at, unsubscribed_at, unsubscribe_token)
    VALUES
      (?, ?, ?, 'pending', ?, ?, ?, NULL, NULL, ?)
    ON DUPLICATE KEY UPDATE
      country = VALUES(country),
      locale = VALUES(locale),
      status = IF(unsubscribed_at IS NULL AND status='active', 'active', 'pending'),
      consent_at = VALUES(consent_at),
      confirm_token = VALUES(confirm_token),
      confirm_expires_at = VALUES(confirm_expires_at),
      confirmed_at = IF(status='active', confirmed_at, NULL),
      unsubscribed_at = IF(status='active', unsubscribed_at, NULL),
      unsubscribe_token = COALESCE(unsubscribe_token, VALUES(unsubscribe_token))
  `;

  const [result] = await pool.execute(sql, [
    cleanEmail,
    cleanCountry,
    cleanLocale,
    consentAt,
    confirmToken,
    confirmExpiresAt,
    unsubscribeToken,
  ]);

  return result.affectedRows;
}

/**
 * Idempotent confirmation (avoids dev StrictMode / double call)
 */
export async function confirmSubscriberByToken(token) {
  const cleanToken = String(token || "").trim();

  // 1) read state
  const [rows] = await pool.execute(
    `SELECT status, confirm_expires_at
     FROM newsletter_subscribers
     WHERE confirm_token = ?
     LIMIT 1`,
    [cleanToken],
  );

  const sub = rows?.[0];
  if (!sub) return { ok: false, reason: "not_found" };

  // expired if not confirmed
  if (
    sub.status !== "active" &&
    sub.confirm_expires_at &&
    new Date(sub.confirm_expires_at) <= new Date()
  ) {
    return { ok: false, reason: "expired" };
  }

  // already confirmed
  if (sub.status === "active") {
    return { ok: true, already: true };
  }

  // activate
  const [result] = await pool.execute(
    `
    UPDATE newsletter_subscribers
    SET
      status = 'active',
      confirmed_at = NOW(),
      confirm_expires_at = NULL,
      unsubscribed_at = NULL
    WHERE confirm_token = ?
    `,
    [cleanToken],
  );

  return { ok: result.affectedRows > 0, already: false };
}

/**
 * Unsubscribe via token
 */
export async function unsubscribeByToken(token) {
  const cleanToken = String(token || "").trim();

  const sql = `
    UPDATE newsletter_subscribers
    SET
      status = 'pending',
      unsubscribed_at = NOW()
    WHERE unsubscribe_token = ?
      AND unsubscribed_at IS NULL
  `;

  const [result] = await pool.execute(sql, [cleanToken]);
  return result.affectedRows;
}

export async function findSubscriberByEmail(email) {
  const clean = String(email || "")
    .trim()
    .toLowerCase();

  const sql = `SELECT * FROM newsletter_subscribers WHERE email = ? LIMIT 1`;
  const [rows] = await pool.execute(sql, [clean]);
  return rows?.[0] || null;
}

/**
 * Admin: list subscribers (pagination + filters + search)
 * ✅ MySQL pagination (LIMIT offset, limit)
 */
export async function listSubscribers({
  status = "all",
  q = "",
  limit = 50,
  offset = 0,
} = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
  const safeOffset = Math.max(Number(offset) || 0, 0);

  const qq = String(q || "")
    .trim()
    .toLowerCase();
  const search = `%${qq}%`;

  let where = "1=1";
  const params = [];

  if (status === "active") {
    where += " AND status = 'active' AND unsubscribed_at IS NULL";
  } else if (status === "pending") {
    where += " AND status = 'pending'";
  } else if (status === "unsubscribed") {
    where += " AND unsubscribed_at IS NOT NULL";
  }

  if (qq) {
    where += " AND email LIKE ?";
    params.push(search);
  }

  const sql = `
    SELECT
      id,
      email,
      country,
      locale,
      status,
      created_at,
      consent_at,
      confirmed_at,
      unsubscribed_at
    FROM newsletter_subscribers
    WHERE ${where}
    ORDER BY created_at DESC
    LIMIT ${safeOffset}, ${safeLimit}
  `;

  const [rows] = await pool.execute(sql, params);
  return rows;
}

/**
 * Batch of active subscribers for sending newsletters
 */
export async function listActiveSubscribersBatch({
  limit = 200,
  offset = 0,
} = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 200, 1), 500);
  const safeOffset = Math.max(Number(offset) || 0, 0);

  const sql = `
    SELECT id, email, unsubscribe_token, country, locale
    FROM newsletter_subscribers
    WHERE status='active' AND unsubscribed_at IS NULL
    ORDER BY id ASC
    LIMIT ${safeOffset}, ${safeLimit}
  `;

  const [rows] = await pool.execute(sql);
  return rows;
}

/**
 * Admin: total for pagination
 */
export async function countSubscribers({ status = "all", q = "" } = {}) {
  const qq = String(q || "")
    .trim()
    .toLowerCase();
  const search = `%${qq}%`;

  let where = "1=1";
  const params = [];

  if (status === "active") {
    where += " AND status='active' AND unsubscribed_at IS NULL";
  } else if (status === "pending") {
    where += " AND status='pending'";
  } else if (status === "unsubscribed") {
    where += " AND unsubscribed_at IS NOT NULL";
  }

  if (qq) {
    where += " AND email LIKE ?";
    params.push(search);
  }

  const sql = `SELECT COUNT(*) as total FROM newsletter_subscribers WHERE ${where}`;
  const [rows] = await pool.execute(sql, params);
  return rows?.[0]?.total || 0;
}

/**
 * Admin: global stats
 */
export async function newsletterStats() {
  const sql = `
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN status='active' AND unsubscribed_at IS NULL THEN 1 ELSE 0 END) AS active,
      SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS pending,
      SUM(CASE WHEN unsubscribed_at IS NOT NULL THEN 1 ELSE 0 END) AS unsubscribed,
      SUM(CASE WHEN confirmed_at IS NOT NULL THEN 1 ELSE 0 END) AS confirmed
    FROM newsletter_subscribers
  `;

  const [rows] = await pool.execute(sql);
  return (
    rows?.[0] || {
      total: 0,
      active: 0,
      pending: 0,
      unsubscribed: 0,
      confirmed: 0,
    }
  );
}
