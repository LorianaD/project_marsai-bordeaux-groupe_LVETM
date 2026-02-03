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
// app.post("/users", validate([nameSchema, emailSchema, partnerValidationSchema],{ includeFile: true }), controller);
import { ZodError } from "zod";
//import { createFilmFileSchema } from "../../zodSchema/filmValidationSchema";
//import { createEmailSchema } from "../../zodSchema/emailValidationSchema";
//import { createUserSchema } form "../../zodSchema/userValidationSchema";

/********************************************* 
 * Middleware de validation des films
 * Fusionne plusieurs schémas Zod pour la validation
 *********************************************/
export function validateCreateFilm(schemas, options = {}) {
  // Toujours un tableau
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];

  return (req, res, next) => {
    try {
      let dataToValidate = req.body;

      // Optionnel : inclure req.file
      if (options.includeFile && req.file) {
        dataToValidate = { ...dataToValidate, file: req.file };
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