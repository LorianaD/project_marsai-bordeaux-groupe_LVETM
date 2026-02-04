import { pool } from "../../db/index.js";

async function insertPartner({ name, img, url = null }) {
    console.log("model inserPartner OK");
    
    const query = `
        INSERT INTO partner (name, img, url)
        VALUES (?, ?, ?)
    `;
    console.log(query);

    const values = [name, img, url];
    console.log(values);
    
    
    const [result] = await pool.execute(query, values);
    console.log(result);
    
    return {
        id: result.insertId,
        name,
        img,
        url,
    };

}

export default insertPartner