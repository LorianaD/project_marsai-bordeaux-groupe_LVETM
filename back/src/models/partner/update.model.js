import { pool } from "../../db/index.js";

async function updatePartner(id, { name, img, url }) {
    console.log("model updatePartner OK");
    
    const query = `
        UPDATE partner
        SET name = ?, img = ?, url = ?
        WHERE id = ?
    `;
    console.log(query);

    const values = [name, img, url, id];
    console.log(values);
    
    
    const [result] = await pool.execute(query, values);
    console.log(result);
    
    return result.affectedRows;

}

export default updatePartner;