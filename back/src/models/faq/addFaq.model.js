import { pool } from "../../db/index.js";

 /*************************************************
 ******** Creer une faq **************************
*************************************************/

export const addFaq = async ({question, answer, rank})=> {
    const query = "INSERT INTO faq (question, answer, rank) VALUES (?, ?, ?)";
    //valeur à ajouter.
    const values = [question, answer, rank];

    const [result] = await pool.execute(query, values);

    return {
        id: result.insertId,
        question,
        answer,
        rank
    }
};