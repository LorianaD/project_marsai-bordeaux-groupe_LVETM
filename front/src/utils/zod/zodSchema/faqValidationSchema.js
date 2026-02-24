/********************************************* 
 * Validation des données de la faq
 *********************************************/
import { z } from "zod";

export const createFaqSchema = z.object({
    rank: z
        .preprocess(
            value => Number(value),// transforme string -> number
            z // schéma qui valide la valeur transformée
                .number({ message: "faq.rank.require" })
                .int({ message: "faq.rank.integer" })
                .nonnegative({ message: "faq.rank.nonnegative" })
        ),
        
    question_fr: z
        .string({message:"faq.question_fr.string"})
        .trim()
        .min(1, "faq.question_fr.required")
        .max(500, "faq.question_fr.max"),

    question_en: z
        .string({message:"faq.question_en.string"})
        .trim()
        .min(1, "faq.question_en.required")
        .max(500, "faq.question_en.max"),

    answer_fr: z
        .string({message:"faq.answer_fr.string"})
        .trim()
        .min(1, "faq.answer_fr.required")
        .max(500, "faq.answer_fr.max"),

    answer_en: z
        .string({message:"faq.answer_en.string"})
        .trim()
        .min(1, "faq.answer_en.required")
        .max(500, "faq.answer_en.max"),
})