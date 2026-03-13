 /***************************************************************************
 ** Schéma pour la validation des images(calqué sur le schéma de Multer) ***
**************************************************************************/
import { z } from "zod";

 /******************************************************
 **** pour les images des jurys ***********************
******************************************************/
export const juryImageSchema = z.object({
    mimetype: z
        .string()
        .regex(/^image\/(jpeg|png|webp)$/i, "Image must be jpg, png or webp."),
    size: z
        .number()
        .max(5 * 1024 * 1024, "Image must be maximum 5MB."),
    originalname: z
        .string()
        .refine(
            (name) => /\.(jpe?g|png|webp)$/i.test(name),
            "Image extension must be jpg, jpeg, png or webp."
        ),
});
//pour les images obligatoires
export const fileJuryImageSchema = z.object({
    file: juryImageSchema,
});
//pour les images optionnelles
export const optionalFileJuryImageSchema = z.object({
    file: juryImageSchema
       .optional(),
});

 /******************************************************
 **** pour les images des partenaires *****************
******************************************************/
export const partnerImageSchema = z.object({
        mimetype: z
            .string()
            .regex(/^image\/png$/i, "Image must be png."),
        size: z
            .number()
            .max(2 * 1024 * 1024, "Image must be maximum 2MB."),
        originalname: z
            .string()
            .refine((name) => /\.png$/i.test(name),"Image extension must be png."
            ),
});
//pour les images obligatoires
export const filePartnerImageSchema = z.object({
    file: partnerImageSchema,
});
//pour les images optionnelles
export const optionalFilePartnerImageSchema = z.object({
    file: partnerImageSchema
       .optional(),
});