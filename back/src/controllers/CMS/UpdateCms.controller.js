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

        const payload = {
            page,
            section,
            locale,
            content_key,
            order_index,
            is_active,
        };

        if (file) {

            const isMedia = content_key === "media";

            payload.value = isMedia ? `/uploads/medias/${file.filename}` : `/uploads/icons/${file.filename}`;

        } else if (value !== undefined) {

            payload.value = value;
        
        }

        const result = await updateCms( payload );

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