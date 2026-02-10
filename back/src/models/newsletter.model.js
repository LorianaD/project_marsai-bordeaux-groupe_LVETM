import { pool } from "../db/index.js";

/**
 * Création / MAJ d’un subscriber en pending (double opt-in)
 */
export async function upsertPendingSubscriber({
  email,
  consentAt,
  confirmToken,
  confirmExpiresAt,
  unsubscribeToken,
}) {
  const clean = String(email || "").trim().toLowerCase();

  const sql = `
    INSERT INTO newsletter_subscribers
      (email, status, consent_at, confirm_token, confirm_expires_at, confirmed_at, unsubscribed_at, unsubscribe_token)
    VALUES
      (?, 'pending', ?, ?, ?, NULL, NULL, ?)
    ON DUPLICATE KEY UPDATE
      status = IF(unsubscribed_at IS NULL AND status='active', 'active', 'pending'),
      consent_at = VALUES(consent_at),
      confirm_token = VALUES(confirm_token),
      confirm_expires_at = VALUES(confirm_expires_at),
      confirmed_at = IF(status='active', confirmed_at, NULL),
      unsubscribed_at = IF(status='active', unsubscribed_at, NULL),
      unsubscribe_token = COALESCE(unsubscribe_token, VALUES(unsubscribe_token))
  `;

  const [result] = await pool.execute(sql, [
    clean,
    consentAt,
    confirmToken,
    confirmExpiresAt,
    unsubscribeToken,
  ]);

  return result.affectedRows;
}

/**
 * Confirmation idempotente (évite l'erreur en dev StrictMode / double call)
 */
export async function confirmSubscriberByToken(token) {
  const cleanToken = String(token || "").trim();

  // 1) récupérer l’état
  const [rows] = await pool.execute(
    `SELECT status, confirm_expires_at
     FROM newsletter_subscribers
     WHERE confirm_token = ?
     LIMIT 1`,
    [cleanToken]
  );

  const sub = rows?.[0];
  if (!sub) return { ok: false, reason: "not_found" };

  // expiré si pas confirmé
  if (
    sub.status !== "active" &&
    sub.confirm_expires_at &&
    new Date(sub.confirm_expires_at) <= new Date()
  ) {
    return { ok: false, reason: "expired" };
  }

  // déjà confirmé
  if (sub.status === "active") {
    return { ok: true, already: true };
  }

  // activer
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
    [cleanToken]
  );

  return { ok: result.affectedRows > 0, already: false };
}

/**
 * Désinscription via token
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
  const clean = String(email || "").trim().toLowerCase();

  const sql = `SELECT * FROM newsletter_subscribers WHERE email = ? LIMIT 1`;
  const [rows] = await pool.execute(sql, [clean]);
  return rows?.[0] || null;
}

/**
 * Admin: liste des subscribers (pagination + filtres + recherche)
 * ✅ pagination MySQL robuste (LIMIT offset, limit)
 */
export async function listSubscribers({
  status = "all",
  q = "",
  limit = 50,
  offset = 0,
} = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
  const safeOffset = Math.max(Number(offset) || 0, 0);

  const qq = String(q || "").trim().toLowerCase();
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
 * Batch des actifs pour l’envoi des newsletters
 */
export async function listActiveSubscribersBatch({ limit = 200, offset = 0 } = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 200, 1), 500);
  const safeOffset = Math.max(Number(offset) || 0, 0);

  const sql = `
    SELECT id, email, unsubscribe_token
    FROM newsletter_subscribers
    WHERE status='active' AND unsubscribed_at IS NULL
    ORDER BY id ASC
    LIMIT ${safeOffset}, ${safeLimit}
  `;

  const [rows] = await pool.execute(sql);
  return rows;
}

/**
 * Admin: total pour pagination
 */
export async function countSubscribers({ status = "all", q = "" } = {}) {
  const qq = String(q || "").trim().toLowerCase();
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
 * Admin: stats globales
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
