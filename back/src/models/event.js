import { pool } from "../db/index.js";

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