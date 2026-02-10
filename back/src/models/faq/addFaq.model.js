import { pool } from "../../db/index.js";

 /*************************************************
 ******** Creer une faq **************************
*************************************************/

export const addFaq = async ({question_fr, question_en, answer_fr, answer_en, rank})=> {
    const query = "INSERT INTO faq (question_fr, question_en, answer_fr, answer_en, `rank`) VALUES (?, ?, ?, ?, ?)";
    //valeur à ajouter.
    const values = [question_fr, question_en, answer_fr, answer_en, rank];

    const [result] = await pool.execute(query, values);

    return {
        id: result.insertId,
        question_fr,
        question_en,
        answer_fr,
        answer_en,
        rank
    }
};