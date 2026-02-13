import { updateFaq } from "../../models/faq/updateFaq.model.js";
import { findFaqById } from "../../models/faq/getOneFaq.model.js";

 /*************************************************
 ****** Update une faqs par id *******************
*************************************************/

export const updateFaqController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        
        const update = await updateFaq(id, data);

        if (update.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "FAQ not found",
            });
        }

        const updatedFaq = await findFaqById(id);
        return res.status(200).json({
            success: true,
            message: "Update succefuly done",
            data: updatedFaq
        })
    
    }catch (error) {
        console.error("An error occur when attempting tu update FAQ", error);
        next(error);
    }
}