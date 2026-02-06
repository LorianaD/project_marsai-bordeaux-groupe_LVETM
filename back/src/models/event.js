import { pool } from "../db/index.js";

export const insertEvent = async (data) => {
  const [result] = await pool.execute(
    `INSERT INTO events (title, description, date, length, stock, illustration, location)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.description ?? null,
      data.date,
      data.length ?? 0,
      data.stock ?? null,
      data.illustration ?? "",
      data.location ?? null,
    ]
  );
  return { id: result.insertId, ...data };
};

// Récupérer tous les events (pour liste / admin)
export const findAllEvents = async () => {
  const [rows] = await pool.execute(
    "SELECT id, title, description, date, length, stock, illustration, location FROM events ORDER BY date ASC"
  );
  return rows;
};

// Récupérer un event par son id (pour page détail / admin)
export const findEventById = async (id) => {
  const [rows] = await pool.execute("SELECT * FROM events WHERE id = ?", [id]);
  return rows[0] || null;
};