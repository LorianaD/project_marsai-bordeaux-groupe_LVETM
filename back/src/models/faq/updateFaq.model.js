import { pool } from "../../db/index.js";

 /*************************************************
 ******** Update une faq *************************
*************************************************/

export const updateFaq = async (id, {question_fr, question_en, answer_fr, answer_en, rank})=> {
    const query = "UPDATE faq SET question_fr = ?, question_en = ?, answer_fr = ?, answer_en = ?, `rank` = ? WHERE id = ?";
    //Valeur à ajouter.
    const values = [question_fr, question_en, answer_fr, answer_en, rank, id];

    const [result] = await pool.execute(query, values);

    return {
        id,
        question_fr,
        question_en,
        answer_fr,
        answer_en,
        rank,
        affectedRows: result.affectedRows
    }
};