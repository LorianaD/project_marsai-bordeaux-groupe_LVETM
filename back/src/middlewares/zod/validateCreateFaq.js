import { ZodError } from "zod";
import { createFaqSchema } from "../../zodSchema/faqValidationSchema.js";

/********************************************* 
 * Middleware de validation FAQ
 *********************************************/

export function validateCreateFaq() {
    return(req, res, next) => {
        try{
            //validation des données
            const validateData = createFaqSchema.parse(req.body);
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