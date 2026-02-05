import { pool } from "../db/index.js";

// Insère les images still liées à une vidéo
async function insertStills(videoId, files, connection = pool) {
  if (!files.length) return;

  const sql = `INSERT INTO still (video_id, file_name) VALUES ?`;
  const values = files.map((f) => [videoId, f.filename]);

  await connection.query(sql, [values]);
}

export default { insertStills };
