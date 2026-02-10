import { pool } from "../../db/index.js";

async function getAllPartner() {
    // console.log("model getAllPartner OK");
    
    const query = `
        SELECT id, name, img, url
        FROM partner
    `;
    // console.log(query);
    
    const [rows] = await pool.execute(query);
    // console.log(rows);
    
    return rows;

}

export default getAllPartner