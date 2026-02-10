import { pool } from "../../db/index.js";

async function updateCms({ page, section, locale, content_key, value, order_index, is_active }) {
    console.log("model updateCms OK");

    const query = `
        UPDATE cms
        SET value = COALESCE(?, value), order_index = ?, is_active = ?, updated_at = NOW()
        WHERE page = ? AND section = ? AND locale = ? AND content_key = ?
    `;
    console.log(query);

    const safeValue = (value === undefined) ? null : value;
    console.log(safeValue);
    
    
    const params = [safeValue, order_index ?? 0, is_active ?? 1, page, section, locale, content_key];
    console.log(params);

    const [row] = await pool.execute(query, params);
    
    return row;
}

export default updateCms