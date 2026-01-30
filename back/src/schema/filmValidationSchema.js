//Voir si toute les images en bdd doivent avoir les meme contrainte que le poster dilm en poids et formatmime
//manquera la validation des entrée CMS
//AJOUTER VERIFICATION 16/9 et taille des fichiers
//Ajout de la vérif de la durée et de la taille du fichier vidéo
//verifier birthday
// voir si l'on doit envoyer null en bdd au lieu de "" pour les phones numbers
// voir si rating dans memo_selector va etre utilisé    rating: z
//        .number({ message: "Video duration is required." })
//        .positive({ message: "Video duration must be positive." })
//verifier si role a ete passé en admin


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
        
    email: z
        .string({message:"Email must be a string."})
        .trim()
        .min(1,"Email is required.")
        .max(255, "Email must not exceed 255 characters.")
        .email({ message: "Email format is invalid." }),

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

    adress: z
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
})

/********************************************* 
 * Schéma pour l'ajout d'un user
 *********************************************/
export const createUserSchema = z.object({

    email: z
        .string({message:"Email must be a string."})
        .trim()
        .min(1,"Email is required.")
        .max(255, "Email must not exceed 255 characters.")
        .email({ message: "Email format is invalid." }),

    password: z //Obligatoire: une majuscule, une minuscule, un chiffre, un caractère spéciale.
        .string({message:"Password must be a string."})
        .min(8, "Password must be at least 8 characters long.")
        .max(128, "Password must not exceed 128 characters.")
        .refine(
            value => /[A-Z]/.test(value),
            { message: "Password must contain at least one uppercase letter." }    
        )
        .refine(
            value => /[a-z]/.test(value),
            { message: "Password must contain at least one lowercase letter." }   
        )
        .refine(
            value => /\d/.test(value),
            { message: "Password must contain at least one number." }
        )
        .refine(
            value => /[!@#$%^&*(),.?":{}|<>]/.test(value),
            { message: "Password must contain at least one special character." }
        ),

    role: z
        .enum(["Admin", "Super_admin", "Selector"]),

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
})

/********************************************* 
 * Schéma pour l'ajout d'un Juré
 *********************************************/
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

/********************************************* 
 * Schéma pour l'ajout d'un Tag
 *********************************************/
export const createTagSchema = z.object({

    name: z
        .string({message:"Name must be a string."})
        .max(55, "Name  must not exceed 55 characters."),
})

/************************************************
 * Schéma pour l'ajout d'un email pour news letter
 ************************************************/
export const createNewsLetterSubscriptionSchema = z.object({
    email: z
        .string({message:"Email must be a string."})
        .trim()
        .min(1,"Email is required.")
        .max(255, "Email must not exceed 255 characters.")
        .email({ message: "Email format is invalid." }),
})

/********************************************* 
 * Schéma pour l'ajout d'un partenaire
 *********************************************/
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

/********************************************* 
 * Schéma pour l'ajout d'un partenaire
 *********************************************/
export const createFaqSchema = z.object({

    question: z
        .string({message:"Question must be a string."})
        .trim()
        .min(1, "Question is required.")
        .max(500, "Question must not exceed 500 characters."),

    answer: z
        .string({message:"Answer must be a string."})
        .trim()
        .min(1, "Answer is required.")
        .max(500, "Answer must not exceed 500 characters."),
})

/********************************************* 
 * Schéma pour l'ajout dans memo_selector
 *********************************************/
export const createMemoSelectorSchema = z.object({

    status: z
        .enum(["Accepted", "Rejected", "To be processed"]),

    comment: z
        .string({message:"Comment must be a string."})
        .trim()
        .max(500, "Comment must not exceed 500 characters.")
        .or(z.literal(""))
        .optional(),

})

/********************************************* 
 * Schéma pour l'ajout dans admin_video
 *********************************************/
export const createAdminVideoSchema = z.object({

    status: z
        .enum(["Video Accepted", "Video Rejected", "Video Banned", "Featured"]),

    comment: z
        .string({message:"Comment must be a string."})
        .trim()
        .max(500, "Comment must not exceed 500 characters.")
        .or(z.literal(""))
        .optional(),
})

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
 * Schéma pour l'ajout dans social media
 *********************************************/
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



/********************************************* 
 * Schéma pour l'ajout dans still
 *********************************************/

/********************************************* 
 * Schéma pour l'ajout dans award
 *********************************************/

/********************************************* 
 * Schéma pour l'ajout dans event
 *********************************************/