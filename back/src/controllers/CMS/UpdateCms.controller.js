import updateCms from "../../models/cms/updateCms.model.js";

async function UpdateCms(req, res, next) {
    console.log("Controller UpdateCms OK");    

    try {
        console.log("try in the controller UpdateCms OK");
        
        const { page, section, locale, content_key } = req.params;
        console.log("params:", req.params);
        
        const { value, order_index, is_active } = req.body;
        console.log("body:", req.body);

        const file = req.file;

        let finalValue = value ?? null;

        if (file) {
            finalValue = "/uploads/icons/" + file.filename;
        }

        const result = await updateCms({
            page,
            section,
            locale,
            content_key,
            value: finalValue,
            order_index: order_index ?? 0,
            is_active: is_active ?? 1,
        });

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: result
        });        

    } catch (error) {
        console.error(error);
        next(error);
    }
}

export default UpdateCms