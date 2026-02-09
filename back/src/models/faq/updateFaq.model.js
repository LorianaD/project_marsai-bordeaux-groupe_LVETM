import { pool } from "../../db/index.js";

 /*************************************************
 ******** Update une faq *************************
*************************************************/

export const updateFaq = async (id, {question, answer})=> {
    const query = "UPDATE faq SET question = ?, answer = ? WHERE id = ?";
    //Valeur à ajouter
    const values = [question, answer, id];

    const [result] = await pool.execute(query, values);

    return {
        id,
        question,
        answer,
        affectedRows: result.affectedRows
    }
};