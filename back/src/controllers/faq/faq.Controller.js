import { findAllFaq } from "../../models/faq.model.js";

export const getFaq = async (req, res) => {
    try {
        const faqs = await findAllFaq();
        res.status(200).json({
            success: true,
            message:"FAQ fetched successfully",
            data: faqs,
        });
    } catch (error) {
        console.error("Failed to retrieve FAQ", error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve FAQ"
        });
    }
}