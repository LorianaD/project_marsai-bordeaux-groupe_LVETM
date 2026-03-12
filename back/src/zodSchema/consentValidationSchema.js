/********************************************* 
 * Validation des données de la newsletter
 *********************************************/
import { z } from "zod";

export const consentSchema = z.object({
    consent: z
        .boolean({ message: "Consent must be a boolean." })
        .refine((value) => value === true, {message: "Consent is required."}),
});