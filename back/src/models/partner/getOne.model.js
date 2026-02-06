import { pool } from "../../db/index.js";

async function getOnePartner(id) {
    // console.log("model getOnePartner OK");
    
    const query = `
        SELECT id, name, img, url
        FROM partner
        WHERE id = ?
    `;
    // console.log(query);
    
    const [rows] = await pool.execute(query, [id]);
    // console.log(rows);
    
    return rows[0] ?? null;

}

export default getOnePartner;