/********************************************* 
 * Schéma pour l'ajout d'un Juré
 *********************************************/
import { z } from "zod";

//contrainte de format et taille pour les vidéos et photos
const pictureFormats = [".jpg", ".jpeg", ".webp", ".png"];

export const createJurySchema = z.object({
    //intitulé de rôle (requis)
    role_label: z
        .string({ message: "Role label must be a string." })
        .trim()
        .min(1, "Role label is required.")
        .max(255, "Role label must not exceed 255 characters."),

    //profession (optionnelle)
    profession: z
        .string({ message: "Profession must be a string." })
        .trim()
        .max(100, "Profession must not exceed 100 characters.")
        .optional()
        .or(z.literal("").transform(() => undefined)),

    //bio (optionnelle)
    bio: z
        .string({message:"Bio resume must be a string."})
        .trim()
        .max(500, "Bio resume must not exceed 500 characters.")
        .optional()
        .or(z.literal("").transform(() => undefined)),

    //URL de filmographie (optionnelle, mais URL valide si présente)
    filmography_url: z
        .string({ message: "Filmography URL must be a string." })
        .trim()
        .url("Filmography URL must be a valid URL.")
        .optional()
        .or(z.literal("").transform(() => undefined)),

    // Ordre d’affichage (entier >= 1, optionnel)
    sort_order: z
        .string({ message: "sort_order must be a string." })
        .trim()
        //regex pour vérifier que le sort_order est un nombre
        .regex(/^\d+$/, {
            message: "sort_order must contain only digits.",
        })
        .optional()
        .or(z.literal("").transform(() => undefined)),

    // Président de jury (0 ou 1, optionnel)
    is_president: z
        .enum(["0", "1"], {
          message: "is_president must be 0 or 1.",
        })
        .optional(),
});