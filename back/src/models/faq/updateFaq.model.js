import { pool } from "../../db/index.js";

 /*************************************************
 ******** Update une faq *************************
*************************************************/

export const updateFaq = async (id, {question, answer, rank})=> {
    const query = "UPDATE faq SET question = ?, answer = ?, rank = ? WHERE id = ?";
    //Valeur à ajouter.
    const values = [question, answer, rank, id];

    const [result] = await pool.execute(query, values);

    return {
        id,
        question,
        answer,
        rank,
        affectedRows: result.affectedRows
    }
};