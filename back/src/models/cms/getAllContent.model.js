import { pool } from "../../db/index.js";

async function getAllContent() {
  const query = `
        SELECT id, page, section, content_key, locale, type, value, order_index, is_active
        FROM cms
    `;

  const [rows] = await pool.execute(query);

  return rows;
}

export default getAllContent;
