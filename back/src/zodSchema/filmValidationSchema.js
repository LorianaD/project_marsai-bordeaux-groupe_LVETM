/********************************************* 
 * Validation des données de la vidéo
 *********************************************/
import { z } from "zod";

/********************************************
 * Formats et taille de video acceptés
 *********************************************/
//contrainte de format et taille pour les vidéos et photos
const videoFormats = [".mp4", ".mov"];
const videoMimeTypes = ["video/mp4", "video/quicktime"];
const pictureFormats = [".jpg", ".jpeg", ".webp", ".png"];
const pictureMimeTypes = ["image/jpeg", "image/jpeg", "image/webp", "image/png"];
const MAX_VIDEO_FILE_SIZE = 350 * 1024 * 1024; // 350 Mo (en octets)
const MAX_VIDEO_FILE_SIZE_IN_MO = 350;
const MIN_VIDEO_FILE_SIZE = 200 * 1024 * 1024; // 200 Mo (en octets)
const MIN_VIDEO_FILE_SIZE_IN_MO = 200;
const MAX_VIDEO_DURATION_IN_SECOND = 60;
const MIN_PICTURE_FILE_SIZE = 100 * 1024; // 100 ko
const MIN_PICTURE_FILE_SIZE_IN_MO= "0.1 Mb (100 Kb)";
const MAX_PICTURE_FILE_SIZE = 15 * 1024 * 1024; // 15 Mo (en octets)
const MAX_PICTURE_FILE_SIZE_IN_MO = "15 Mb";
/**********************************************************************
 a ajouter plus tardconst ASPECT_RATIO = video 16/9
 *********************************************************************/

/********************************************* 
 * Schéma pour la création d'une vidéo (formulaire)
 *********************************************/
export const createFilmSchema = z.object({

    youtube_video_id: z
        .string({message:"YouTube video ID must be a string."})
        .trim()
        .max(250,"YouTube video ID must not exceed 250 characters.")
        .or(z.literal(""))
        .optional(),

    video_file_name: z
        .string({message:"Video file name must be a string."})
        .trim()
        .min(1, "Video file name is required.")
        .max(250, "Video file name must not exceed 250 characters.")
        .refine(
            (value) => {
                // Récuperation et vérification de la validité de l'extension.
                const extension = value.substring(value.lastIndexOf(".")).toLowerCase();
                return videoFormats.includes(extension);
            },
            `Unsupported video format. Accepted formats: ${videoFormats.join(", ")}`
        ),

    title_en: z
        .string({message:"Title must be a string."})
        .trim()
        .min(1, "Title is required.")
        .max(100, "Title must not exceed 100 characters."),

    synopsis: z
        .string({message:"Synopsis must be a string."})
        .trim()
        .min(1, "Synopsis is required.")
        .max(500, "Synopsis must not exceed 500 characters."),

    synopsis_en: z
        .string({message:"Synopsis_en must be a string."})
        .trim()
        .min(1, "Synopsis_en is required.")
        .max(500, "Synopsis_en must not exceed 500 characters."),

    cover: z
        .string({message:"Cover must be a string."})
        .trim()
        .min(1, "Cover is required.")
        .max(250, "Cover must not exceed 250 characters.")
        .refine(
            (value) => {
                // Récuperation et vérification de la validité de l'extension.
                const extension = value.substring(value.lastIndexOf(".")).toLowerCase();
                return pictureFormats.includes(extension);
            },
            `Unsupported cover format. Accepted formats: ${pictureFormats.join(", ")}`
        ),

    still: z
        .string({message:"still must be a string."})
        .trim()
        .min(1, "still is required.")
        .max(250, "still must not exceed 250 characters.")
        .refine(
            (value) => {
                // Récuperation et vérification de la validité de l'extension.
                const extension = value.substring(value.lastIndexOf(".")).toLowerCase();
                return pictureFormats.includes(extension);
            },
            `Unsupported still format. Accepted formats: ${pictureFormats.join(", ")}`
        ),        

    language: z
        .string({message:"Language must be a string."})
        .trim()
        .min(1, "Language is required.")
        .max(100, "Language must not exceed 100 characters"),

    country: z //Code ISO 3166-1 alpha-2
        .string({message:"Country must be a string."})
        .trim()
        .nonempty("Country is required.")
        .length(2, "Country must be exactly 2 characters.")
        .regex(/^[A-Za-z]{2}$/, "Country must be a valid ISO 2-letter code.")
        .transform(value => value.toUpperCase()),

    duration: z
        .number({ message: "Video duration is required." })
        .positive({ message: "Video duration must be positive." })
        .max(MAX_VIDEO_DURATION_IN_SECOND, `Video duration must not exceed ${MAX_VIDEO_DURATION_IN_SECOND} seconds` 
        ),

    tech_resume: z
        .string({message:"Tech resume must be a string."})
        .trim()
        .min(1, "Tech resume is required.")
        .max(500, "Tech resume must not exceed 500 characters."),

    ai_tech: z
        .string({message:"Ai tech must be a string."})
        .trim()
        .min(1, "Ai tech is required.")
        .max(100, "Ai tech must not exceed 100 characters."),

    creative_resume: z
        .string({message:"Creative resume must be a string."})
        .trim()
        .min(1, "Creative resume is required.")
        .max(500, "Creative resume must not exceed 500 characters."),

    director_firstname: z
        .string({message:"Director firstname must be a string."})
        .trim()
        .min(1, "Drector firstname is required.")
        .max(100, "Director firstname must not exceed 100 characters.")
        .regex(
        /^[\p{L}\s'-]+$/u, // Lettres Unicode, espaces, apostrophes et tirets
        "Director firstname can only contain letters, spaces, apostrophes or hyphens."
        ),

    director_lastname: z
        .string({message:"Director lastname must be a string."})
        .trim()
        .min(1, "Director lastname is required.")
        .max(100, "Director lastname must not exceed 100 characters.")
        .regex(
        /^[\p{L}\s'-]+$/u, // Lettres Unicode, espaces, apostrophes et tirets
        "Director lastname can only contain letters, spaces, apostrophes or hyphens."
        ),

    director_gender: z
        .enum(["Mrs", "Mr"]),

    birthday: z
        .string({ message: "Birthday must be a string" })
        .trim()
        .min(1, "Birthday is required")
        .refine(value => {
            const [day, month, year] = value.split("-").map(Number)
            if (!day || !month || !year) return false
            const d = new Date(year, month - 1, day)
            return !isNaN(d.getTime()) && d.getTime() <= Date.now()
        }, { message: "Birthday must be a valid date in the past" }),

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
        .or(z.literal(""))
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
            { message: "Only digits and + at the beginning are allowed for home number" }
        )
        .or(z.literal(""))
        .optional(),

    address: z
        .string({ message: "Address must be a string" })
        .trim()
        .min(1, "Address is required")
        .max(255, "Address must not exceed 255 characters")
    .refine(
    value =>
      /^[\p{L}\p{N}\s.,\-/#'’()]+$/u.test(value), //autorise lettres unicode, chiffres unicode et certain caractère spéciaux
    {message: "Address contains invalid characters",}
    ),

    director_country: z //Code ISO 3166-1 alpha-2
        .string({message:"Director country must be a string."})
        .trim()
        .nonempty("Director country is required.")
        .length(2, "Director country must be exactly 2 characters.")
        .regex(/^[A-Za-z]{2}$/, "Director country must be a valid ISO 2-letter code.")
        .transform(value => value.toUpperCase()),

    discovery_source: z
        .string({message:"Discovery source must be a string."})
        .trim()
        .min(1, "Discovery source is required")
        .max(50, "Discovery source must not exceed 50 characters."),

    upload_status: z
        .enum(["Pending", "Uploading", "Processing", "Published", "Failed"]),
});

/********************************************* 
 * Schéma pour le fichier vidéo (req.file)
 *********************************************/
export const createFilmFileSchema = z.object({

    size: z
        .number({ message: "File size is required"})
        .positive({message: "File size must be positive"})
        .min(MIN_VIDEO_FILE_SIZE, {
            message:`File size must exceed ${MIN_VIDEO_FILE_SIZE_IN_MO} MB`
        })
        .max(MAX_VIDEO_FILE_SIZE, {
            message: `File size must not exceed ${MAX_VIDEO_FILE_SIZE_IN_MO} MB`
        }),

    mimetype: z
        .enum(videoMimeTypes, {
            errorMap: () => ({ message: `Invalid video format. Only ${videoMimeTypes.join(" and ")} are allowed` })
        }),
});

/********************************************* 
 * Schéma pour la cover (req.file)
 *********************************************/
export const createCoverFileSchema = z.object({

    size: z
        .number({ message: "File size is required"})
        .positive({message: "File size must be positive"})
        .min(MIN_PICTURE_FILE_SIZE, {
            message:`File size must exceed ${MIN_PICTURE_FILE_SIZE_IN_MO}`
        })
        .max(MAX_PICTURE_FILE_SIZE, {
            message: `File size must not exceed ${MAX_PICTURE_FILE_SIZE_IN_MO} `
        }),

    mimetype: z
        .enum(pictureMimeTypes, {
            errorMap: () => ({ message: `Invalid image format. Only ${pictureFormats.join(", ")} are allowed` })
        }),
});

/********************************************* 
 * Schéma pour l'ajout dans still (req.file)
 *********************************************/
export const createStillFileSchema = z.object ({

    size: z
        .number({ message: "File size is required" })
        .positive({ message: "File size must be positive" })
        .min(MIN_PICTURE_FILE_SIZE, {
        message: `File size must exceed ${MIN_PICTURE_FILE_SIZE_IN_MO}`,
        })
        .max(MAX_PICTURE_FILE_SIZE, {
        message: `File size must not exceed ${MAX_PICTURE_FILE_SIZE_IN_MO}`,
        }),
  
    mimetype: z
        .enum(pictureMimeTypes, {
            errorMap: () => ({
                message: `Invalid image format. Only ${pictureFormats.join(", ")} are allowed`,
            }),
        })
});

/********************************************* 
 * Schéma pour l'ajout dans contributor
 *********************************************/
export const createContributorSchema = z.object({

    firstname: z
        .string({message:"Director firstname must be a string."})
        .trim()
        .min(1, "Drector firstname is required.")
        .max(255, "Director firstname must not exceed 255 characters.")
        .regex(
        /^[\p{L}\s'-]+$/u, // Lettres Unicode, espaces, apostrophes et tirets
        "Director firstname can only contain letters, spaces, apostrophes or hyphens."
        ),

    lastname: z
        .string({message:"Director lastname must be a string."})
        .trim()
        .min(1, "Director lastname is required.")
        .max(255, "Director lastname must not exceed 255 characters.")
        .regex(
        /^[\p{L}\s'-]+$/u, // Lettres Unicode, espaces, apostrophes et tirets
        "Director lastname can only contain letters, spaces, apostrophes or hyphens."
        ),

    director_gender: z
        .enum(["Mrs", "Mr"]),

    email: z
        .string({message:"Email must be a string."})
        .trim()
        .min(1,"Email is required.")
        .max(255, "Email must not exceed 255 characters.")
        .email({ message: "Email format is invalid." }),

    production_role: z
        .string({message:"Production role must be a string."})
        .trim()
        .min(1, "Production role is required.")
        .max(155, "Production role must not exceed 155 characters."),        
    
})

/********************************************* 
 * Schéma pour l'ajout d'un Tag
 *********************************************/
export const createTagSchema = z.object({

    name: z
        .string({message:"Name must be a string."})
        .max(55, "Name  must not exceed 55 characters."),
})