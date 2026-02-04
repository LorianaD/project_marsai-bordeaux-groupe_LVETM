import { ZodError } from "zod";
import { createEmailSchema } from "../../zodSchema/emailValidationSchema.js";

/********************************************* 
 * Middleware de validation d'une inscription a la newsletter
 *********************************************/

export function validateCreateEmail() {
    return(req, res, next) => {
        try{
            //validation des données
            const validateData = createEmailSchema.parse(req.body);
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