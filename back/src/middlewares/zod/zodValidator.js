/* schema:
réseau sociaux
user
video
contributor
still
cover
video subtitle
tag
*/
//exemple de route:
//import { createFaqSchema } from "../../zodSchema/zodIndex";
// app.post("/users", validate([nameSchema, emailSchema, partnerValidationSchema],{ includeFile: true }), controller);
//ou
// app.post("/users", validate(nameSchema,{ includeFile: true }), controller);
//ou
// app.post("/users", validate(nameSchema,{ includeFiles: true }), controller);
import { ZodError } from "zod";



/********************************************* 
 * Middleware de validation des données
 * Fusionne plusieurs schémas Zod pour la validation
 *********************************************/
export function validate(schemas, options = {}) {
    // Convertion du schema en tableau si ce n'est pas un tableau.
    const schemaArray = Array.isArray(schemas) ? schemas : [schemas];

    return (req, res, next) => {
        try {
            let dataToValidate = { ...req.body };

        // Inclure les fichiers uploadés
        if (options.includeFile && req.files) {
			Object.keys(req.files).forEach((field) => {
				dataToValidate[field] = req.files[field];
			});
        }

        // Fusionner tous les schémas
        let combinedSchema = schemaArray[0];
        for (let i = 1; i < schemaArray.length; i++) {
        	combinedSchema = combinedSchema.merge(schemaArray[i]);
        }

        // Valider les données
        const validatedData = combinedSchema.parse(dataToValidate);
        req.body = validatedData;

    	// Passer au middleware suivant
        next();
    	} catch (error) {
      		if (error instanceof ZodError) {
        		return res.status(400).json({
          			success: false,
          			message: "Validation error",
          			errors: error.issues.map(issue => ({
            			field: issue.path.join("."),
            			message: issue.message
          			}))
        		});
      		}	

        // Autres erreurs
        next(error);
    	}
  	};
}