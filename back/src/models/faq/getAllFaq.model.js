import { pool } from "../../db/index.js";

 /*************************************************
 ****** Récupérer toutes les faqs ****************
*************************************************/

export const findAllFaq = async ()=> {

    const query = "SELECT id, question_fr, question_en, answer_fr, answer_en, `rank` FROM faq ORDER BY `rank` ASC"

    const [ rows ] = await pool.execute(query);
    
    return rows;
};