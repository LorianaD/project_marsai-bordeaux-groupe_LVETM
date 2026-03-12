import { pool } from "../../db/index.js";

 /*************************************************
 ****** Récupérer toutes les faqs ****************
*************************************************/

export const findAllFaq = async ()=> {

    const query = "SELECT id, question_fr, question_en, answer_fr, answer_en, display_order FROM faq ORDER BY display_order ASC"

    const [ rows ] = await pool.execute(query);
    
    return rows;
};