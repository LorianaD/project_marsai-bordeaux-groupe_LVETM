// verifier format, resolution et poids des images

/********************************************* 
 * Validation des données du partenaire commercial
 *********************************************/
import { z } from "zod";

export const createPartenerSchema = z.object({
    name: z
        .string({message:"Name must be a string."})
        .trim()
        .min(1,"Name is required.")
        .max(255, "Name must not exceed 255 characters."),

    img: z
        .string({message:"Img must be a string."})
        .trim()
        .min(1, "Img is required.")
        .max(250, "Img must not exceed 250 characters.")
        .refine(
            (value) => {
                // Récuperation et vérification de la validité de l'extension.
                const extension = value.substring(value.lastIndexOf(".")).toLowerCase();
                return pictureFormats.includes(extension);
            },
            `Unsupported img format. Accepted formats: ${pictureFormats.join(", ")}`
        ),

    url: z
        .string({ message: "Url must be a string." })
        .trim()
        .min(1, "Url is required.")
        .max(255, "Url must not exceed 255 characters.")
        .url({ message: "Url must be a valid URL." }),
})