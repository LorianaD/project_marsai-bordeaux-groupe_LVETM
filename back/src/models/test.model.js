import { pool } from "../db/index.js";

async function pingDatabase() {
  const [rows] = await pool.execute("SELECT 1 AS ok");
  return rows[0];
}

export default {
  pingDatabase,
};
