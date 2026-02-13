import { pool } from "../../db/index.js";

 /*************************************************
 ******** Effacer une faq *************************
*************************************************/

export const deleteFaq = async (id)=> {
    const query = "DELETE FROM faq WHERE id = ?";
    //Valeur à ajouter.
    const values = [id];

    const [result] = await pool.execute(query, values);

    return result.affectedRows
};