/********************************************* 
 * Schéma pour l'ajout dans admin_video
 *********************************************/
import { z } from "zod";

export const createAdminVideoSchema = z.object({
    status: z
        .enum(["Video Accepted", "Video Rejected", "Video Banned", "Featured"]),

    comment: z
        .string({message:"Comment must be a string."})
        .trim()
        .max(500, "Comment must not exceed 500 characters.")
        .or(z.literal(""))
        .optional(),
})