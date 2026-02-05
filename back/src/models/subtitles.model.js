import { pool } from "../db/index.js";

// Insère les sous-titres liés à une vidéo
async function insertSubtitles(videoId, files, connection = pool) {
  if (!files.length) return;

  const sql = `INSERT INTO video_subtitles (video_id, file_name, language) VALUES ?`;

  const values = files.map((f) => [
    videoId,
    f.filename ?? f.file_name,
    f.language ?? null,
  ]);

  await connection.query(sql, [values]);
}

export default { insertSubtitles };
