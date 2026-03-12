import { pool } from "../../db/index.js";

async function deletePartner(id) {
    // console.log("model inserPartner OK");
    
    const query = `
        DELETE FROM partner
        WHERE id = ?
    `;
    // console.log(query);

    const values = [id];
    // console.log(values);
    
    
    const [result] = await pool.execute(query, values);
    // console.log(result);
    
    return result.affectedRows;

}

export default deletePartner