import { pool } from "../db/index.js";

async function findAllJury() {
  const sql = `
    SELECT
      id,
      name,
      first_name,
      img,
      bio,
      profession,
      role_label,
      is_president,
      filmography_url,
      sort_order
    FROM jury
    ORDER BY is_president DESC, sort_order ASC, id ASC
  `;

  const [rows] = await pool.execute(sql);
  return rows;
}

export default { findAllJury };
