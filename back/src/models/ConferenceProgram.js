import { pool } from "../db/index.js"

export async function findAll() {
  const [rows] = await pool.execute(
    // On sélectionne aussi la future colonne `date` pour préparation de la migration.
    "SELECT id, date, day, time, title, speaker, color, sort_order FROM conference_program ORDER BY date ASC, time ASC, id ASC"
  );
  return rows;
}

export async function findById(id) {
  const [rows] = await pool.execute(
    "SELECT id, date, day, time, title, speaker, color, sort_order FROM conference_program WHERE id = ?",
    [id]
  );
  return rows[0] || null;
}

// creea les progrms
export async function insert(data) {
  const [result] = await pool.execute(
    // On écrit désormais `date` ET `day` pour assurer une transition douce.
    "INSERT INTO conference_program (date, day, time, title, speaker, color, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      data.date ?? null,
      data.day ?? null,
      data.time ?? "09:00",
      data.title ?? "",
      data.speaker ?? null,
      data.color ?? "bg-sky-400",
      data.sort_order ?? 0,
    ]
  );
  return { id: result.insertId, ...data };
}
export const create = insert;

// modif les progrms

export async function update(id, data) {
  await pool.execute(
    "UPDATE conference_program SET date = ?, day = ?, time = ?, title = ?, speaker = ?, color = ?, sort_order = ? WHERE id = ?",
    [
      data.date ?? null,
      data.day ?? null,
      data.time ?? "09:00",
      data.title ?? "",
      data.speaker ?? null,
      data.color ?? "bg-sky-400",
      data.sort_order ?? 0,
      id,
    ]
  );
  const updated = await findById(id);
  return updated;
}

  // supprimer  les progr
  export async function remove(id) {
    const [result] = await pool.execute("DELETE FROM conference_program WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }