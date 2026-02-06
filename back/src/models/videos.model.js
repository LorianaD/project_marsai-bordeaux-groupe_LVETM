import { pool } from "../db/index.js";

// Liste des vidéos publiées avec filtres optionnels
async function findPublishedVideos(filters = {}) {
  const { title, theme } = filters;

  let sql = `
    SELECT
      v.id,
      v.title,
      v.title_en,
      v.synopsis,
      v.cover,
      v.duration,
      v.country,
      v.language,
      v.director_name,
      v.director_lastname,
      v.director_country
    FROM videos v
    WHERE v.upload_status = 'Published'
  `;

  const params = [];

  if (title) {
    sql += " AND v.title_en LIKE ?";
    params.push(`%${title}%`);
  }

  if (theme) {
    sql += `
      AND EXISTS (
        SELECT 1
        FROM film_tag ft
        JOIN tag t ON t.id = ft.tag_id
        WHERE ft.video_id = v.id AND t.name = ?
      )
    `;
    params.push(theme);
  }

  sql += " ORDER BY v.id DESC";

  const [rows] = await pool.execute(sql, params);
  return rows;
}

// Détail d'une vidéo publiée par id
async function findOnePublishedVideoById(id) {
  const sql = `
    SELECT
      id,
      title,
      title_en,
      synopsis,
      synopsis_en,
      video_file_name,
      cover,
      duration,
      country,
      language,
      director_name,
      director_lastname,
      director_country,
      ai_tech
    FROM videos
    WHERE id = ?
      AND upload_status = 'Published'
  `;

  const [rows] = await pool.execute(sql, [id]);
  return rows[0] || null;
}

// Infos minimales pour le streaming
async function findVideoFileById(id) {
  const sql = `
    SELECT id, video_file_name, upload_status
    FROM videos
    WHERE id = ?
  `;

  const [rows] = await pool.execute(sql, [id]);
  return rows[0] || null;
}

// Crée une vidéo en base
async function createVideo(payload, connection = pool) {
  const sql = `
    INSERT INTO videos (
      youtube_video_id,
      video_file_name,
      title,
      title_en,
      synopsis,
      synopsis_en,
      cover,
      language,
      country,
      duration,
      tech_resume,
      ai_tech,
      creative_resume,
      email,
      director_name,
      director_lastname,
      director_gender,
      birthday,
      mobile_number,
      home_number,
      address,
      director_country,
      discovery_source,
      upload_status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    payload.youtube_video_id ?? null,
    payload.video_file_name,
    payload.title,
    payload.title_en,
    payload.synopsis,
    payload.synopsis_en,
    payload.cover,
    payload.language,
    payload.country,
    Number(payload.duration),
    payload.tech_resume,
    payload.ai_tech,
    payload.creative_resume,
    payload.email,
    payload.director_name,
    payload.director_lastname,
    payload.director_gender,
    payload.birthday,
    payload.mobile_number ?? null,
    payload.home_number ?? null,
    payload.address,
    payload.director_country,
    payload.discovery_source,
    payload.upload_status ?? "Pending",
  ];

  const [result] = await connection.execute(sql, params);
  return result.insertId;
}

// Liste admin de toutes les vidéos
async function findAllVideosAdmin() {
  const sql = `
    SELECT
      v.id,
      v.title,
      v.title_en,
      v.synopsis,
      v.synopsis_en,
      v.cover,
      v.duration,
      v.country,
      v.language,
      v.director_name,
      v.director_lastname,
      v.director_country,
      v.upload_status,
      v.featured,
      v.created_at
    FROM videos v
    ORDER BY v.created_at DESC, v.id DESC
  `;

  const [rows] = await pool.execute(sql);
  return rows;
}

// Met à jour le statut d'une vidéo
async function updateVideoStatus(id, upload_status) {
  const sql = `
    UPDATE videos
    SET upload_status = ?
    WHERE id = ?
  `;

  const [result] = await pool.execute(sql, [upload_status, id]);
  return result.affectedRows;
}

// Met à jour le champ featured
async function updateVideoFeatured(id, featured) {
  const sql = `
    UPDATE videos
    SET featured = ?
    WHERE id = ?
  `;

  const [result] = await pool.execute(sql, [featured ? 1 : 0, id]);
  return result.affectedRows;
}

// Détail admin d'une vidéo
async function findOneVideoByIdAdmin(id) {
  const sql = `
    SELECT
      id,
      youtube_video_id,
      video_file_name,
      title,
      title_en,
      synopsis,
      synopsis_en,
      cover,
      duration,
      country,
      language,
      tech_resume,
      ai_tech,
      creative_resume,
      email,
      director_name,
      director_lastname,
      director_gender,
      birthday,
      mobile_number,
      home_number,
      address,
      director_country,
      discovery_source,
      upload_status,
      featured,
      created_at
    FROM videos
    WHERE id = ?
  `;

  const [rows] = await pool.execute(sql, [id]);
  return rows[0] || null;
}

export default {
  findPublishedVideos,
  findOnePublishedVideoById,
  findVideoFileById,
  createVideo,
  findAllVideosAdmin,
  updateVideoStatus,
  updateVideoFeatured,
  findOneVideoByIdAdmin,
};
