/********************************************* 
 * Schéma pour l'ajout dans awards
 *********************************************/
import { z } from "zod";

/********************************************
 * Formats et taille de video acceptés
 *********************************************/
//contrainte de format et taille pour les vidéos et photos
const pictureFormats = [".jpg", ".jpeg", ".webp", ".png"];



export const createAwardSchema = z.object({
    title: z
        .string({ message: "Url must be a string." })
        .trim()
        .min(1, "title is required.")
        .max(255, "Url must not exceed 255 characters."),

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

    rank: z
        .number({ message: "Rank is required." })
        .positive({ message: "Rank must be positive." }),
})