import { pool } from "../../db/index.js";

//creer une faq
export const addFaq = async ({question, answer})=> {
    const query = "INSERT INTO faq (question, answer) VALUES (?, ?)";
    const [result] = await pool.execute(query, [question, answer]);

    return {
        id: result.insertId,
        question,
        answer
    }
}