import { pool } from "../../db/index.js";

 /*************************************************
 ******** Creer une faq **************************
*************************************************/

export const addFaq = async (data)=> {
    const query = "INSERT INTO faq ( `rank`, question_fr, question_en, answer_fr, answer_en ) VALUES (?, ?, ?, ?, ?)";

    const rank = data.rank;
    const question_fr = data.question_fr;
    const question_en = data.question_en;
    const answer_fr = data.answer_fr;
    const answer_en = data.answer_en;
    //valeur à ajouter.
    const values = [rank, question_fr, question_en, answer_fr, answer_en];

    const [result] = await pool.execute(query, values);

    return {
        id: result.insertId,
        rank,
        question_fr,
        question_en,
        answer_fr,
        answer_en
    }
};