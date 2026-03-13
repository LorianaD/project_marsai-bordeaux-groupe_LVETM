 /**************************************************************************
 *** Schéma pour la validation des données du CMS *************************
**************************************************************************/
import { z } from "zod";

//schéma order_index
const orderIndexSchema = z.preprocess(
    (value) => (value === undefined || value === null || value === "" ? 0 : Number(value)),
    z
        .number({ message: "Order index must be a number." })
        .int({ message: "Order index must be an integer." })
        .min(0, "Order index must be 0 or greater."),
);

//schéma is_active (0 ou 1)
const isActiveSchema = z.preprocess(
    (value) => {
        if (value === "1" || value === 1 || value === true || value === "true") return 1;
        if (value === "0" || value === 0 || value === false || value === "false") return 0;
        return value;
    },
    z
        .number({ message: "is_active must be 0 or 1." })
        .int()
        .min(0, "is_active must be 0 or 1.")
        .max(1, "is_active must be 0 or 1."),
);

//req avec value, order_index et is_active
export const cmsTextUpdateSchema = z.object({
    value: z
        .string({ message: "Value must be a string." })
        .trim()
        .min(1, "Value is required.")
        .max(5000, "Value must not exceed 5000 characters."),
    order_index: orderIndexSchema,
    is_active: isActiveSchema,
});

//req avec order_index et is_active
export const cmsActiveUpdateSchema = z.object({
    order_index: orderIndexSchema,
    is_active: isActiveSchema,
});

//Cas FICHIER (image / media) : updateImageApi
export const cmsFileUpdateSchema = z.object({
    file: z.object({
        mimetype: z
            .string({ message: "File mimetype must be a string." })
            .regex(/^(image\/|video\/)/, "File must be an image or a video."),
        size: z
            .number({ message: "File size must be a number." })
            .max(50 * 1024 * 1024, "File must be maximum 50MB."),
        originalname: z
            .string({ message: "Filename must be a string." })
            .trim()
            .min(1, "Filename is required."),
    }),
    order_index: orderIndexSchema,
    is_active: isActiveSchema,
});