import { pool } from "../../db/index.js";

async function getCmsByPageSection(page, section, locale) {
    console.log("model getContentByHerKey OK");

    const query = `
        SELECT id, page, section, content_key, locale, type, value, order_index, is_active
        FROM cms
        WHERE content_key = ? AND section = ? AND locale = ? AND is_active = 1
        ORDER BY order_index ASC, id ASC
    `;
    console.log(query);
    
    const [rows] = await pool.execute(query, [page, section, locale]);
    console.log(rows);
    
    return rows;

}

export default getCmsByPageSection