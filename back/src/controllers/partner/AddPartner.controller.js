import insertPartner from "../../models/partner/insert.model.js";

async function AddPartner(req, res, next) {
    console.log("controller AddPartner OK");

    try {
        console.log("try in the controller AddPartner OK");
        
        const { name, url } = req.body;
        console.log(name, url);
        

        const img = req.file ? `/uploads/logoPartners/${req.file.filename}` : null;
        console.log(img);
        

        const partner = await insertPartner({ name, img, url: url || null });
        console.log(partner);

        res.status(201).json({ 
            success: true,
            message: "Partner created successfully",
            data: partner
        });
        
    } catch (error) {
        console.error('An error occurred while inserting the partner', error);
        next(error);
    }


}

export default AddPartner