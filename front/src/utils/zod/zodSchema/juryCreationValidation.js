import { z } from "zod";

/********************************************* 
 * Schéma pour l'ajout d'un Juré
 *********************************************/

/********************************************
 * Formats et taille d'image acceptés
 *********************************************/
//contrainte de format et taille pour les vidéos et photos
const pictureFormats = [".jpg", ".jpeg", ".webp", ".png"];

export const createJurySchema = z.object({

    firstname: z
        .string({message:"Firstname must be a string."})
        .trim()
        .min(1, "Firstname is required.")
        .max(100, "Firstname must not exceed 100 characters.")
        .regex(
        /^[\p{L}\s'-]+$/u, // Lettres Unicode, espaces, apostrophes et tirets
        "Firstname can only contain letters, spaces, apostrophes or hyphens."
        ),

    lastname: z
        .string({message:"Lastname must be a string."})
        .trim()
        .min(1, "Lastname is required.")
        .max(100, "Lastname must not exceed 100 characters.")
        .regex(
        /^[\p{L}\s'-]+$/u, // Lettres Unicode, espaces, apostrophes et tirets
        "Lastname can only contain letters, spaces, apostrophes or hyphens."
        ),

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
    
    bio: z
        .string({message:"Bio resume must be a string."})
        .trim()
        .max(500, "Bio resume must not exceed 500 characters.")
        .or(z.literal(""))
        .optional(),

    profession: z
        .string({message:"Profession resume must be a string."})
        .trim()
        .max(100, "Profession resume must not exceed 100 characters.")
        .or(z.literal(""))
        .optional(),
})