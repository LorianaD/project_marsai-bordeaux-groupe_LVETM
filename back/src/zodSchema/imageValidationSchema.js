/********************************************* 
 * Schéma pour la validation des images(calqué sur le schéma de Multer)
 *********************************************/
import { z } from "zod";

export const imageSchema = z.object({
    mimetype: z
        .string()
        .regex(/^image\/(jpeg|png|webp)$/i, "Image must be jpg, png or webp."),
    size: z
        .number()
        .max(5 * 1024 * 1024, "Image must be <= 5MB."),
    originalname: z
        .string()
        .refine(
            (name) => /\.(jpe?g|png|webp)$/i.test(name),
            "Image extension must be jpg, jpeg, png or webp."
        ),
});

//pour les images obligatoires
export const fileImageSchema = z.object({
    file: imageSchema,
});

//pour les images optionnelles
export const optionalFileImageSchema = z.object({
    file: imageSchema
       .optional(),
});