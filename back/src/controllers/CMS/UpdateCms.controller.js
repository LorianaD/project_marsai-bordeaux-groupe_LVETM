import updateCms from "../../models/cms/updateCms.model.js";

async function UpdateCms(req, res, next) {
    console.log("Controller UpdateCms OK");    

    try {
        console.log("try in the controller UpdateCms OK");
        
        const { page, section, locale, content_key } = req.params;
        const { value, order_index, is_active } = req.body;

        const result = await updateCms({
            page,
            section,
            locale,
            content_key,
            value,
            order_index,
            is_active,
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