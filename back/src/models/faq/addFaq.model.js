import { pool } from "../../db/index.js";

 /*************************************************
 ******** Creer une faq **************************
*************************************************/

export const addFaq = async ({question, answer})=> {
    const query = "INSERT INTO faq (question, answer) VALUES (?, ?)";
    //valeur à ajouter.
    const values = [question, answer];

    const [result] = await pool.execute(query, values);

    return {
        id: result.insertId,
        question,
        answer
    }
};