/********************************************* 
 * Validation des données de la faq
 *********************************************/
import { z } from "zod";

export const createFaqSchema = z.object({
    question: z
        .string({message:"Question must be a string."})
        .trim()
        .min(1, "Question is required.")
        .max(500, "Question must not exceed 500 characters."),

    answer: z
        .string({message:"Answer must be a string."})
        .trim()
        .min(1, "Answer is required.")
        .max(500, "Answer must not exceed 500 characters."),
})