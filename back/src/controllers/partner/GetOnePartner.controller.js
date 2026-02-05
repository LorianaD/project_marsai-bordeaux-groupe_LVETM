import getOnePartner from "../../models/partner/getOne.model.js";

async function GetOnePartner(req, res) {
    console.log("Controller GetOnePartner OK");

    try {
        // console.log("try in the controller GetOnePartner OK");

        const { id } = req.params
        // console.log(id);

        const partner = await getOnePartner(id);
        // console.log(partner);
        
        if(!partner) {
            return res.status(404).json({
                success: false,
                message: "Partner not found",
            });
        }

        return res.status(200).json({
            success:true,
            message: "Partner fetched successfully",
            data: partner,
        })

    } catch (error) {

        console.error('An error occurred while fetching the partner', error);
        next(error);

    }

}

export default GetOnePartner