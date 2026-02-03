/********************************************* 
 * Schéma pour l'ajout dans events
 *********************************************/
import { z } from "zod";

export const createEventSchema = z.object({
    title: z
        .string({ message: "Title must be a string." })
        .trim()
        .min(1, "Title is required.")
        .max(255, "Title must not exceed 255 characters."),

    description: z
        .string({message:"Description must be a string."})
        .trim()
        .max(500, "Description must not exceed 500 characters.")
        .or(z.literal(""))
        .optional(),

    date : z
        .string({ message: "Date must be a string" })
        .trim()
        .min(1, "Date is required")
        .refine(value => {
            const [day, month, year] = value.split("-").map(Number)
            if (!day || !month || !year) return false

            const dateObject = new Date(year, month - 1, day)
            if (isNaN(dateObject.getTime())) return false

            const today = new Date()
            today.setHours(0, 0, 0, 0) // configure l'heure a 0 pour la comparaison
            return dateObject.getTime() >= today.getTime()
        }, { message: "Date must be today or in the future" }),

    stock: z
        .preprocess(
            value => Number(value),// transforme string -> number
            z // schéma qui valide la valeur transformée
                .number({ message: "Stock is required." })
                .int({ message: "Stock must be an integer." })
                .nonnegative({ message: "Stock must be 0 or positive." })
        )
})