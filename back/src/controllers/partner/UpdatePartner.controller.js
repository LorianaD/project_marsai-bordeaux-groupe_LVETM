import updatePartner from "../../models/partner/update.model.js";
import getOnePartner from "../../models/partner/getOne.model.js";

async function UpdatePartner(req, res, next) {
    console.log("Controller UpdatePartner OK");

    try {
        console.log("try in the controller UpdatePartner OK");

        const { id } = req.params;
        console.log(id);
        
        const partnerExist = await getOnePartner(id);

        const partner = Array.isArray(partnerExist) ? partnerExist[0] : partnerExist;

        if (!partner) {
            return res.status(404).json({
                success: false,
                message: "Partner not found"
            });
        }

        const name = req.body.name;
        const url = req.body.url;
        console.log(name, url);

        const nextImg = req.file ? `/uploads/logoPartners/${req.file.filename}` : partnerExist.img;
        console.log(nextImg);

        const nextName = typeof name === "string" && name.trim() !== "" ? name.trim() : partnerExist.name;
        const nextUrl = typeof url === "string" && url.trim() !== "" ? url.trim() : partnerExist.url;

        const updated = await updatePartner(id, {
            name: nextName,
            img: nextImg,
            url: nextUrl
        });

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Partner not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Partner updated successfully",
            data: {
                id: Number(id),
                name: nextName,
                img: nextImg,
                url: nextUrl
            },
        });

    } catch (error) {
        
        console.error("An error occurred while updating the partner", error);
        next(error);

    }
    
}

export default UpdatePartner;