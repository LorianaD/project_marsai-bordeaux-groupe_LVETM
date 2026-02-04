/********************************************* 
 * Schéma pour l'ajout d'un admin
 *********************************************/
export const createAdminSchema = z.object({

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