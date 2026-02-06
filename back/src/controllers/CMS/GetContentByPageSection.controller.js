import getCmsByPageSection from "../../models/cms/getCmsByPageSection.model.js";

async function GetContentByPageSection(req, res, next) {
    console.log("Controller GetContentByPageSection OK");    

    try {
        console.log("try in the controller GetContentByPageSection OK");
        
        const { page, section, locale } = req.params;
        console.log("params:", req.params);
        console.log({ page, section, locale });
        
        

        const result = await getCmsByPageSection({
            page,
            section,
            locale
        });

        return res.status(200).json({
            success: true,
            message: "CMS content fetched successfully",
            data: result
        });        

    } catch (error) {
        console.error(error);
        next(error);
    }
}

export default GetContentByPageSection