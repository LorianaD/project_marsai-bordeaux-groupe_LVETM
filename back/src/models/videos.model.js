import { pool } from "../db/index.js";

// LISTE (façade publique)
async function findPublishedVideos(filters = {}) {
  const { title, theme } = filters;

  let sql = `
    SELECT
      v.id,
      v.title_en,
      v.synopsis,
      v.cover,
      v.duration,
      v.country,
      v.language
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

// DÉTAIL D’UNE VIDÉO (publique)
async function findOnePublishedVideoById(id) {
  const sql = `
    SELECT
      id,
      title_en,
      synopsis,
      synopsis_en,
      video_file_name,
      cover,
      duration,
      country,
      language,
      director_name,
      director_lastname
    FROM videos
    WHERE id = ?
      AND upload_status = 'Published'
  `;

  const [rows] = await pool.execute(sql, [id]);
  return rows[0] || null;
}

// STREAM : fichier vidéo (on garde Published ici aussi)
async function findVideoFileById(id) {
  const sql = `
    SELECT id, video_file_name, upload_status
    FROM videos
    WHERE id = ?
  `;

  const [rows] = await pool.execute(sql, [id]);
  return rows[0] || null;
}

// CREATE (compatible transaction via connection)
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

export default {
  findPublishedVideos,
  findOnePublishedVideoById,
  findVideoFileById,
  createVideo,
};
