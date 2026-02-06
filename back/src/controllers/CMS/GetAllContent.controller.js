import getAllContent from "../../models/cms/getAllContent.model.js";

async function GetAllContent(req, res, next) {
    console.log("Controller GetAllPartner OK");

    try {
        console.log("try in the controller GetAllPartner OK");

        const contents = await getAllContent();

        res.status(200).json({ 
            success: true,
            message: "OK",
            data: contents
        });
        
    } catch (error) {
        console.error('An error occurred while fetching partners', error);
        next(error);
    }


}

export default GetAllContent;