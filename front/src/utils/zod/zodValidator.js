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
    } catch (error) {
        
    }
}