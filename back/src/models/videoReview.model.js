import { pool } from "../db/index.js";

async function findMyReview(videoId, userId) {
  const sql = `
    SELECT id, video_id, user_id, rating, comment, created_at, updated_at
    FROM video_review
    WHERE video_id = ? AND user_id = ?
    LIMIT 1
  `;
  const [rows] = await pool.execute(sql, [Number(videoId), Number(userId)]);
  return rows[0] || null;
}

async function upsertReview({ videoId, userId, rating, comment }) {
  const vid = Number(videoId);
  const uid = Number(userId);
  const r = Number(rating);

  if (!Number.isFinite(vid) || vid <= 0) throw new Error("videoId invalide");
  if (!Number.isFinite(uid) || uid <= 0) throw new Error("userId invalide");
  if (!Number.isFinite(r) || r < 1 || r > 10)
    throw new Error("rating invalide");

  const sql = `
    INSERT INTO video_review (video_id, user_id, rating, comment)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      rating = VALUES(rating),
      comment = VALUES(comment),
      updated_at = CURRENT_TIMESTAMP
  `;

  await pool.execute(sql, [
    vid,
    uid,
    r,
    comment?.trim() ? comment.trim() : null,
  ]);

  return findMyReview(vid, uid);
}

async function findReviewsByVideoId(videoId) {
  const vid = Number(videoId);
  if (!Number.isFinite(vid) || vid <= 0) throw new Error("videoId invalide");

  const sql = `
    SELECT
      vr.id,
      vr.video_id,
      vr.user_id,
      vr.rating,
      vr.comment,
      vr.created_at,
      vr.updated_at,
      u.firstname,
      u.lastname,
      u.email
    FROM video_review vr
    JOIN users u ON u.id = vr.user_id
    WHERE vr.video_id = ?
    ORDER BY vr.updated_at DESC
  `;

  const [rows] = await pool.execute(sql, [vid]);
  return rows;
}

async function findReviewsSummaryByVideoId(videoId) {
  const vid = Number(videoId);
  if (!Number.isFinite(vid) || vid <= 0) throw new Error("videoId invalide");

  const sql = `
    SELECT
      ROUND(AVG(rating), 1) AS score,
      COUNT(*) AS reviews_count
    FROM video_review
    WHERE video_id = ?
  `;

  const [rows] = await pool.execute(sql, [vid]);
  return rows[0] || { score: null, reviews_count: 0 };
}

export default {
  findMyReview,
  upsertReview,
  findReviewsByVideoId,
  findReviewsSummaryByVideoId,
};
