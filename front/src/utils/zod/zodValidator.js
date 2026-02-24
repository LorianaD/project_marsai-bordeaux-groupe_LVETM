import { ZodError } from "zod";

export function validate(schemas, formData, options = {}) {
    // Convertion du schema en tableau si ce n'est pas un tableau.
    const schemaArray = Array.isArray(schemas) ? schemas : [schemas];

    try {
        let dataToValidate = { ...formData };

        // Inclure les fichiers uploadés
        if (options.includeFile && options.files) {
            Object.keys(options.files).forEach((field) => {
                dataToValidate[field] = options.files[field];
            });
        }

        // Fusion des schémas
        let combinedSchema = schemaArray[0];
        for (let i = 1; i < schemaArray.length; i++) {
            combinedSchema = combinedSchema.merge(schemaArray[i]);
        }

        // Validation des données
        const validatedData = combinedSchema.parse(dataToValidate);

        return {
            success: true,
            message: "Data validation done",
            data: validatedData
        };

    } catch (error) {
        if (error instanceof ZodError) {
            return {
                success:false,
                message:"Validation error",
                errors: error.issues.map(issue =>({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            };
        }
        throw error;
    }
}