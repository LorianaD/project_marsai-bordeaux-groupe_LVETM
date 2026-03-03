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

async function findJuryById(id) {
  const [rows] = await pool.execute(`SELECT * FROM jury WHERE id = ? LIMIT 1`, [
    id,
  ]);
  return rows[0] || null;
}

async function createJury(payload) {
  const sql = `
    INSERT INTO jury
      (name, first_name, img, bio, profession, role_label, is_president, filmography_url, sort_order, created_at, updated_at)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
  `;

  const params = [
    payload.name,
    payload.first_name,
    payload.img || null,
    payload.bio || null,
    payload.profession || null,
    payload.role_label || null,
    Number(payload.is_president || 0),
    payload.filmography_url || null,
    Number(payload.sort_order || 1),
  ];

  const [result] = await pool.execute(sql, params);
  return result.insertId;
}

async function updateJury(id, payload) {
  // img est optionnel : si null => on ne change pas, si string => on change
  const sets = [];
  const params = [];

  const fields = [
    "name",
    "first_name",
    "bio",
    "profession",
    "role_label",
    "filmography_url",
  ];

  for (const f of fields) {
    if (payload[f] !== undefined) {
      sets.push(`${f} = ?`);
      params.push(payload[f] || null);
    }
  }

  if (payload.is_president !== undefined) {
    sets.push(`is_president = ?`);
    params.push(Number(payload.is_president || 0));
  }

  if (payload.sort_order !== undefined) {
    sets.push(`sort_order = ?`);
    params.push(Number(payload.sort_order || 1));
  }

  if (payload.img !== undefined) {
    sets.push(`img = ?`);
    params.push(payload.img || null);
  }

  sets.push(`updated_at = NOW()`);

  const sql = `UPDATE jury SET ${sets.join(", ")} WHERE id = ?`;
  params.push(id);

  const [result] = await pool.execute(sql, params);
  return result.affectedRows;
}

async function deleteJury(id) {
  const [result] = await pool.execute(`DELETE FROM jury WHERE id = ?`, [id]);
  return result.affectedRows;
}

export default {
  findAllJury,
  findJuryById,
  createJury,
  updateJury,
  deleteJury,
};
