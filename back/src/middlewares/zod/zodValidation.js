import { ZodError } from "zod";

/********************************************* 
 * Middleware de validation avec zod
 *********************************************/
/**
 * Middleware générique de validation avec Zod
 * @param {object} schema - Schéma Zod pour valider la requête
 * @param {object} options - Options spécifiques (ex: inclure req.file)
 */
export function validate(schema, options ={}) {
    return (req, res, next) => {
        try {
            let dataToValidate = req.body;
            //inclu req.file si il est dans la requete
            if(options.includeFile && req.file){
                dataToValidate={...dataToValidate, file: req.file};
            }

            //validation des données
            const validatedData = schema.parse(dataToValidate);
            //injecte les données validées dans req.body 
            req.body = validatedData;

            //passe au middleware suivant
            next();
        } catch (error) {
            if(error instanceof ZodError){
                return res.status(400).json({
                    success:false,
                    message:"Validation error",
                    errors: error.issues.map(err=> ({
                        field:err.path.join("."),
                        message:err.message
                    }))
                });
            }
            //// Gestion des erreurs qui ne sont pas des erreurs de validation Zod
            return res.status(400).json({
                success:false,
                message:"Validation error",
                errors:error.message
            });
        }
    };
}