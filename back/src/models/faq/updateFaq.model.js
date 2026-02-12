import { pool } from "../../db/index.js";

 /*************************************************
 ******** Update une faq *************************
*************************************************/

export const updateFaq = async (id, data)=> {
    const query = "UPDATE faq SET `rank` = ?, question_fr = ?, question_en = ?, answer_fr = ?, answer_en = ? WHERE id = ?";

    const rank = data.rank;
    const question_fr = data.question_fr;
    const question_en = data.question_en;
    const answer_fr = data.answer_fr;
    const answer_en = data.answer_en;
    
    //Valeur à ajouter.
    const values = [rank, question_fr, question_en, answer_fr, answer_en, id];

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