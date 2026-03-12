import deletePartner from "../../models/partner/delete.model.js";

async function DeletePartnerController(req, res, next) {
    // console.log("Controller DeletPartner OK");
    
    try {
        console.log("try in the controller DeletePartner OK");

        const { id } = req.params;
        console.log(id);
        
        const partnerDelete = await deletePartner(id);

        if (!partnerDelete) {
            return res.status(404).json({
                success: false,
                message: "Partner not found"
            });
        }

        res.json({
            message: "Partner delete successfull"
        })
        
    } catch (error) {
        console.error("An error occurred while delete the partner", error);
        next(error);
    }
}

export default DeletePartnerController