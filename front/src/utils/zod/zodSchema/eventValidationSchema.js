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

    date: z
        .string({ message: "Date must be a string" })
        .trim()
        .min(1, "Date is required")
        .refine(value => {
            const dateObject = new Date(value)
            if (isNaN(dateObject.getTime())) return false

            const today = new Date()
            today.setHours(0, 0, 0, 0) // configure l'heure a 0 pour la comparaison
            return dateObject.getTime() >= today.getTime()
        }, { message: "Date must be today or in the future." }),

    length: z
        .preprocess(
            value => Number(value),//transforme string en number
            z//schéma de validation pour la valeur transformée
                .number({ message:"Length is required."})
                .int ({ message: "Length must be an integer."})
                .nonnegative({ message: "Length cannot be a negative number."})
        ),
        

    stock: z
        .preprocess(
            value => Number(value),// transforme string -> number
            z // schéma qui valide la valeur transformée
                .number({ message: "Stock is required." })
                .int({ message: "Stock must be an integer." })
                .nonnegative({ message: "Stock cannot be a negative number." })
        ),

    // illustration: z

    location: z
        .string({ message:"Location must be a string."})
        .trim()
        .max(255, "Location must not exceed 255 characters.")
        .or(z.literal(""))
        .optional(),

})

export const publishEventSchema = z.object({
    published: z
        .boolean({
            invalid_type_error: "Published must be a boolean",
            required_error: "Published is required",})
})