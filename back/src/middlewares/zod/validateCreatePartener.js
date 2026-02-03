import { ZodError } from "zod";
import { createPartenerSchema } from "../../zodSchema/partenerValidationSchema.js";

/********************************************* 
 * Middleware de validation des données du partenaire commercial
 *********************************************/

export function validateCreatePartener() {
    return(req, res, next) => {
        try{
            //validation des données
            const validateData = createPartenerSchema.parse(req.body);
            //injecte les données validées dans req.body
            req.body = validateData;
            //passer au prochain middleware
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors: error.errors.map(err=> ({
                        field: err.path.join("."),
                        message: err.message
                    }))
                });       
            }
            //autres erreur
            next(error);
        }
    };
}