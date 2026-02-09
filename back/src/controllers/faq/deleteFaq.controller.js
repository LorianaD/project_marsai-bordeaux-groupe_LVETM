import { deleteOneFaq } from "../../models/faq/deleteFaq.model.js";

export const deleteFaq = async (req, res) => {

    const { id } = req.params;
    try {
        const faqs = await deleteOneFaq(id);
        res.status(200).json({
            success: true,
            message:"FAQ deleted successfully",
        });
    } catch (error) {
        console.error("Failed to delete FAQ", error)
        res.status(500).json({
            success: false,
            message: "Failed to delete FAQ"
        });
    }
}