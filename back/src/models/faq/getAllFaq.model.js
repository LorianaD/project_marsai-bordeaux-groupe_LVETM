import { pool } from "../../db/index.js";

 /*************************************************
 ****** Récupérer toutes les faqs ****************
*************************************************/

export const findAllFaq = async ()=> {
    const [ rows ] = await pool.execute(
        "SELECT id, question, answer, `rank` FROM faq ORDER BY `rank` ASC"
    );
    return rows;
};