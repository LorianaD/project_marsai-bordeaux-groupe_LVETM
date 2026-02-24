import { pool } from "../db/index.js";

/**
 * Retourne la review du user connecté pour une vidéo
 */
async function findMyReview(videoId, userId) {
  const sql = `
    SELECT id, video_id, user_id, rating, comment, created_at, updated_at
    FROM video_review
    WHERE video_id = ? AND user_id = ?
    LIMIT 1
  `;
  const [rows] = await pool.execute(sql, [videoId, userId]);
  return rows[0] || null;
}

/**
 * Upsert (1 review max par user/video)
 */
async function upsertReview({ videoId, userId, rating, comment }) {
  const sql = `
    INSERT INTO video_review (video_id, user_id, rating, comment)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      rating = VALUES(rating),
      comment = VALUES(comment),
      updated_at = CURRENT_TIMESTAMP
  `;

  await pool.execute(sql, [videoId, userId, rating, comment ?? null]);

  // on renvoie la version actuelle
  return findMyReview(videoId, userId);
}

export default {
  findMyReview,
  upsertReview,
};
