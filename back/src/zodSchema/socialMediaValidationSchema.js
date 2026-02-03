/********************************************* 
 * Validation des données des liens social media
 *********************************************/
import { z } from "zod";

export const createSocialMediaSchema = z.object({
    instagram: z
        .string({ message: "Url must be a string." })
        .trim()
        .max(500, "Url must not exceed 500 characters.")
        .url({ message: "Url must be a valid URL." })
        .or(z.literal(""))
        .optional(),

    facebook: z
        .string({ message: "Url must be a string." })
        .trim()
        .max(500, "Url must not exceed 500 characters.")
        .url({ message: "Url must be a valid URL." })
        .or(z.literal(""))
        .optional(),

    tiktok: z
        .string({ message: "Url must be a string." })
        .trim()
        .max(500, "Url must not exceed 500 characters.")
        .url({ message: "Url must be a valid URL." })
        .or(z.literal(""))
        .optional(),

    linkedin: z
        .string({ message: "Url must be a string." })
        .trim()
        .max(500, "Url must not exceed 500 characters.")
        .url({ message: "Url must be a valid URL." })
        .or(z.literal(""))
        .optional(),

    youtube: z
        .string({ message: "Url must be a string." })
        .trim()
        .max(500, "Url must not exceed 500 characters.")
        .url({ message: "Url must be a valid URL." })
        .or(z.literal(""))
        .optional(),

    website: z
        .string({ message: "Url must be a string." })
        .trim()
        .max(500, "Url must not exceed 500 characters.")
        .url({ message: "Url must be a valid URL." })
        .or(z.literal(""))
        .optional(),

    x: z
        .string({ message: "Url must be a string." })
        .trim()
        .max(500, "Url must not exceed 500 characters.")
        .url({ message: "Url must be a valid URL." })
        .or(z.literal(""))
        .optional(),
})