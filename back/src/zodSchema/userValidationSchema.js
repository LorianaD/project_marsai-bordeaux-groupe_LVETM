/********************************************* 
 * Schéma pour l'ajout d'un admin
 *********************************************/
import { z } from "zod";

export const emailSchema = z.object ({

    email: z
        .string({message:"Email must be a string."})
        .trim()
        .min(1,"Email is required.")
        .max(255, "Email must not exceed 255 characters.")
        .email({ message: "Email format is invalid." }),
});

export const passwordSchema = z.object ({

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
});

export const createUserSchema = z.object({

    firstname: z
        .string({message:"Firstname must be a string."})
        .trim()
        .min(1, "First name is required.")
        .max(100, "First name must not exceed 100 characters.")
        .regex(
        /^[\p{L}\s'-]+$/u, // Lettres Unicode, espaces, apostrophes et tirets
        "Firstname can only contain letters, spaces, apostrophes or hyphens."
        ),

    lastname: z
        .string({message:"Lastname must be a string."})
        .trim()
        .min(1, "Last name is required.")
        .max(100, "Last name must not exceed 100 characters.")
        .regex(
        /^[\p{L}\s'-]+$/u, // Lettres Unicode, espaces, apostrophes et tirets
        "Last name can only contain letters, spaces, apostrophes or hyphens."
        ), 
})

export const roleSchema = z.object({
    role: z.enum(["admin", "superadmin", "selector"]),
});

export const createUserSnakeSchema = z.object({
    name: z
      .string({ message: "Name must be a string." })
      .trim()
      .min(1, "First name is required.")
      .max(100, "First name must not exceed 100 characters.")
      .regex(
        /^[\p{L}\s'-]+$/u,
        "Firstame can only contain letters, spaces, apostrophes or hyphens."
      ),
    last_name: z
      .string({ message: "Last name must be a string." })
      .trim()
      .min(1, "Last name is required.")
      .max(100, "Last name must not exceed 100 characters.")
      .regex(
        /^[\p{L}\s'-]+$/u,
        "Last name can only contain letters, spaces, apostrophes or hyphens."
      ),
    });