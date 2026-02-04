import updatePartner from "../../models/partner/update.model.js";

async function UpdatePartner(req, res, next) {
    console.log("Controller UpdatePartner OK");

    try {
        console.log("try in the controller UpdatePartner OK");

        const { id } = req.params;
        const { name, img, url } = req.body;

        const updated = await updatePartner(id, { name, img, url });

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Partner not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Partner updated successfully",
            data: { id: Number(id), name, img, url },
        });

    } catch (error) {
        
        console.error("An error occurred while updating the partner", error);
        next(error);

    }
    
}

export default UpdatePartner;