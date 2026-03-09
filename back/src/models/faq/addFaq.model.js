import { pool } from "../../db/index.js";

 /*************************************************
 ******** Creer une faq **************************
*************************************************/

export const addFaq = async (data)=> {
    const query = "INSERT INTO faq ( display_order, question_fr, question_en, answer_fr, answer_en ) VALUES (?, ?, ?, ?, ?)";

    const display_order = data.display_order;
    const question_fr = data.question_fr;
    const question_en = data.question_en;
    const answer_fr = data.answer_fr;
    const answer_en = data.answer_en;
    //valeur à ajouter.
    const values = [display_order, question_fr, question_en, answer_fr, answer_en];

    const [result] = await pool.execute(query, values);

    return {
        id: result.insertId,
        display_order,
        question_fr,
        question_en,
        answer_fr,
        answer_en
    }
};