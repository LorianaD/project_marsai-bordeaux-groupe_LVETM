 /**************************************************** 
 ** Middleware de validation Zod pour le CMS ********
***************************************************/
//import du middleware de validation Zod
import { validate } from "./zodValidator.js";
//import des schémas Zod pour le CMS
import { cmsTextUpdateSchema, cmsActiveUpdateSchema, cmsFileUpdateSchema} from "../../zodSchema/zodIndex.js";

export function cmsValidateMiddleware(req, res, next) {
    //cas 1 : présence d'un fichier -> updateImageApi (form-data)
    if (req.file) {
        return validate(cmsFileUpdateSchema, { includeFile: true })(req, res, next);
    }
    //cas 2 : body JSON avec "value" -> updateContentApi (texte)
    const { value } = req.body;
    if (value !== undefined) {
        return validate(cmsTextUpdateSchema)(req, res, next);
    }
    //cas 3 : body JSON sans "value" -> updateActiveApi (activation uniquement)
    return validate(cmsActiveUpdateSchema)(req, res, next);
};