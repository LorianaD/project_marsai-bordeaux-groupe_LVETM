/********************************************* 
 * Validation des données email
 *********************************************/
import { z } from "zod";

export const createEmailSchema = z.object({
    email: z
        .string({message:"Email must be a string."})
        .trim()
        .min(1,"Email is required.")
        .max(255, "Email must not exceed 255 characters.")
        .email({ message: "Email format is invalid." }),
})