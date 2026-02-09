import { pool } from "../../db/index.js";

async function getAllContent() {
    console.log("model getAllContent OK");
    
    const query = `
        SELECT id, page, section, content_key, locale, type, value, order_index, is_active
        FROM cms
    `;
    console.log(query);
    
    const [rows] = await pool.execute(query);
    console.log(rows);
    
    return rows;

}

export default getAllContent