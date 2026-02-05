/********************************************* 
 * Schéma pour l'ajout dans memo_selector
 *********************************************/
import { z } from "zod";

export const createMemoSelectorSchema = z.object({
    status: z
        .enum(["Accepted", "Rejected", "To be processed"]),

    comment: z
        .string({message:"Comment must be a string."})
        .trim()
        .max(500, "Comment must not exceed 500 characters.")
        .or(z.literal(""))
        .optional(),

})