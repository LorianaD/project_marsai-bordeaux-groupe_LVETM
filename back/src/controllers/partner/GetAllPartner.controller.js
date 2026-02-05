import getAllPartner from "../../models/partner/getAll.model.js";

async function GetAllPartner(req, res, next) {
    console.log("Controller GetAllPartner OK");

    try {
        console.log("try in the controller GetAllPartner OK");

        const partners = await getAllPartner();


        res.status(200).json({ 
            success: true,
            message: "Partners fetched successfully",
            data: partners
        });
        
    } catch (error) {
        console.error('An error occurred while fetching partners', error);
        next(error);
    }


}

export default GetAllPartner;