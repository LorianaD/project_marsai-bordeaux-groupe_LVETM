/********************************************* 
 * Validation des données de la faq
 *********************************************/
import { z } from "zod";

export const createFaqSchema = z.object({
    rank: z
        .preprocess(
            value => Number(value),// transforme string -> number
            z // schéma qui valide la valeur transformée
                .number({ message: "Rank is required." })
                .int({ message: "Rank must be an integer." })
                .nonnegative({ message: "Rank must be 0 or positive." })
        ),
        
    question_fr: z
        .string({message:"Question must be a string."})
        .trim()
        .min(1, "Question is required.")
        .max(500, "Question must not exceed 500 characters."),

    question_en: z
        .string({message:"Question must be a string."})
        .trim()
        .min(1, "Question is required.")
        .max(500, "Question must not exceed 500 characters."),

    answer_fr: z
        .string({message:"Answer must be a string."})
        .trim()
        .min(1, "Answer is required.")
        .max(500, "Answer must not exceed 500 characters."),

    answer_en: z
        .string({message:"Answer must be a string."})
        .trim()
        .min(1, "Answer is required.")
        .max(500, "Answer must not exceed 500 characters."),
})