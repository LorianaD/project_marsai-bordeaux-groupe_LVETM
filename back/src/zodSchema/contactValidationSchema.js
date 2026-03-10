/********************************************* 
 * Schéma pour l'enregistrement d'un message de contact
 *********************************************/
import { z } from "zod";

export const contactSchema = z.object ({

    subject: z
        .string({ message: "Subject must be a string." })
        .trim()
        .min(1, "Subject is required.")
        .max(255, "Subject must not exceed 255 characters."),

    message: z
        .string({ message: "Message must be a string." })
        .trim()
        .min(1, "Message is required.")
        .max(2000, "Message must not exceed 2000 characters."),
});