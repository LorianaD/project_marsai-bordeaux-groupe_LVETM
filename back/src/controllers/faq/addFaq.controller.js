import { addFaq } from "../../models/faq/addFaq.model.js";

 /*************************************************
 ****** Ajout d'un faq ***************************
*************************************************/

export const addFaqController = async (req, res, next) => {
    try {
        const data = req.body;

        const newFaq = await addFaq(data);
        res.status(201).json({
            success: true,
            message: "Faq created successfuly",
            data: newFaq
        })
    } catch (error) {
        console.error("An error occurred while creating the FAQ", error);
        next(error);
    }
}