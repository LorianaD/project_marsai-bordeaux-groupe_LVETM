// AJOUTER VERIFICATION 16/9 et taille des fichiers
//verifier birthday
// voirf si l'on doit envoyer null en bdd au lieu de "" pour les phones numbers

/********************************************* 
 * Validation des données de la vidéo
 *********************************************/
import { z } from "zod";

/********************************************
 * Formats et taille de video acceptés
 *********************************************/
//contrainte de format et taille pour les vidéos et photos
const videoFormats = [".mp4", ".mov"];
const pictureFormats = [".jpg", ".mpeg"]
const videoMimeTypes = ["video/mp4", "video/quicktime"];
const MAX_VIDEO_FILE_SIZE = 300 * 1024 * 1024; // 300 Mo (en octets)
const MAX_VIDEO_FILE_SIZE_IN_MO = 300;
const MIN_VIDEO_FILE_SIZE = 200 * 1024 * 1024; // 200 Mo (en octets)
const MIN_VIDEO_FILE_SIZE_IN_MO = 200;
const MAX_VIDEO_DURATION_IN_SECOND = 60;
const MAX_PICTURE_FILE_SIZE = 15 * 1024 * 1024; // 15 Mo en octets
const MAX_PICTURE_FILE_SIZE_IN_MO = 15;
/**********************************************************************
 a ajouter plus tardconst ASPECT_RATIO = video 16/9
 *********************************************************************/

/********************************************* 
 * Schéma pour la création d'une vidéo
 *********************************************/
export const createFilmSchema = z.object({

    youtube_video_id: z
        .string({message:"The YouTube video ID must be a string."})
        .trim()
        .max(250,"The YouTube video ID must not exceed 250 characters.")
        .or(z.literal(""))
        .optional(),

    video_file_name: z
        .string({message:"The video file name must be a string."})
        .trim()
        .min(1, "The video file name is required.")
        .max(250, "The video file name must not exceed 250 characters.")
        .refine(
            (value) => {
                // Récuperation et vérification de la validité de l'extension.
                const extension = value.substring(value.lastIndexOf(".")).toLowerCase();
                return videoFormats.includes(extension);
            },
            `Unsupported video format. Accepted formats: ${videoFormats.join(", ")}`
        ),

    title_en: z
        .string({message:"The title must be a string."})
        .trim()
        .min(1, "The title is required.")
        .max(100, "The title must not exceed 100 characters."),

    synopsis: z
        .string({message:"The synopsis must be a string."})
        .trim()
        .min(1, "The synopsis is required.")
        .max(500, "The synopsis must not exceed 500 characters."),

    synopsis_en: z
        .string({message:"The synopsis_en must be a string."})
        .trim()
        .min(1, "The synopsis_en is required.")
        .max(500, "The synopsis_en must not exceed 500 characters."),

    cover: z
        .string({message:"The cover must be a string."})
        .trim()
        .min(1, "The cover is required.")
        .max(250, "The cover must not exceed 250 characters.")
        .refine(
            (value) => {
                // Récuperation et vérification de la validité de l'extension.
                const extension = value.substring(value.lastIndexOf(".")).toLowerCase();
                return pictureFormats.includes(extension);
            },
            `Unsupported picture format. Accepted formats: ${pictureFormats.join(", ")}`
        ),

    language: z
        .string({message:"The language must be a string."})
        .trim()
        .min(1, "The language is required.")
        .max(100, "The language must not exceed 100 characters"),

    country: z
        .string({message:"The country must be a string."})
        .trim()
        .min(1, "The country is required.")
        .max(100, "The country must not exceed 100 characters"),

    duration: z
        .number({ message: "The video duration is required." })
        .positive({ message: "The video duration must be positive." })
        .max(MAX_VIDEO_DURATION_IN_SECOND, `The video duration must not exceed ${MAX_VIDEO_DURATION_IN_SECOND} seconds` 
        ),

    tech_resume: z
        .string({message:"The tech_resume must be a string."})
        .trim()
        .min(1, "The tech_resume is required.")
        .max(500, "The tech_resume must not exceed 500 characters."),

    ai_tech: z
        .string({message:"The ai_tech must be a string."})
        .trim()
        .min(1, "The ai_tech is required.")
        .max(100, "The ai_tech must not exceed 100 characters."),

    creative_resume: z
        .string({message:"The creative_resume must be a string."})
        .trim()
        .min(1, "The creative_resume is required.")
        .max(500, "The creative_resume must not exceed 500 characters."),
        
    email: z
        .string({message:"The email must be a string."})
        .trim()
        .min(1,"The email is required.")
        .max(255, "The email must not exceed 255 characters.")
        .email({ message: "The email format is invalid." })
        ,

    director_name: z
        .string({message:"The director name must be a string."})
        .trim()
        .min(1, "The director name is required.")
        .max(100, "The director name must not exceed 100 characters."),

    director_lastname: z
        .string({message:"The director lastname must be a string."})
        .trim()
        .min(1, "The director lastname is required.")
        .max(100, "The director lastname must not exceed 100 characters."),

    director_gender: z
        .enum(["Mrs", "Ms"]),

    birthday: z
        .string({message:"Birthday must be a string"})
        .trim()
        .min(1, "Birthday is required")
        .refine(
            value => !isNaN(new Date(value).getTime()),
            { message: "Birthday must be a valid date" }
        )
        .refine(
            value => new Date(value).getTime() <= Date.now(),
            { message: "Birthday cannot be in the future" }
        ),

    mobile_number: z
        .string({ message: "Mobile number must be a string" })
        .trim()
        .transform(
            value => value.replace(/\s+/g, "") //suprrime tous les espaces de value
        )
        .max(20, "Mobile number must not exceed 20 characters.")
        .refine(
            value => value === "" || /^\+?\d+$/.test(value), //value peut être une chaine vide ou contenir un + optionnel au tout début, suivi uniquement de chiffres
            { message: "Only digits and + are allowed" }
        )
        .optional(),

    home_number: z
        .string({ message: "Home number must be a string" })
        .trim()
        .transform(
            value => value.replace(/\s+/g, "") // supprime tous les espaces
        )
        .max(20, "Home number must not exceed 20 digits.") // longueur maximale après nettoyage
        .refine(
            value => value === "" || /^\+?\d+$/.test(value), //value peut être une chaine vide ou contenir un + optionnel au tout début, suivi uniquement de chiffres
            { message: "Only digits and + at the beginning are allowed" }
        )
        .optional(),

    adress: z
        .string({ message: "Adress must be a string" })
        .trim()
        .min(1, "Home number is required")

})