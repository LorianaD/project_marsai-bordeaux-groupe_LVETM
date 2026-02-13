import { pool } from "../../db/index.js";

 /*************************************************
 ****** Récupérer une faqs par id ****************
*************************************************/

export const findFaqById = async (id) => {

    const query = "SELECT id, question_fr, question_en, answer_fr, answer_en, `rank` FROM faq WHERE id = ?";

    const [ rows ] = await pool.execute(query,[id]);

    return rows[0] || null;
};