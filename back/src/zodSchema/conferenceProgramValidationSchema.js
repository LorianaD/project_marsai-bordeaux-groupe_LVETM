/********************************************* 
 * Validation des données de la conférence program
 *********************************************/
import { z } from "zod";

export const conferenceProgramSchema = z.object({
    day: z.enum([ "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], {
        message: "Day must be either Monday, Tuesday, Wednesday, Thursday, Friday, Saturday or Sunday.",
    }),
    time: z
        .string({ message: "Time must be a string." })
        .trim()
        .regex(/^\d{2}:\d{2}$/, {
            message: "Time must be in HH:MM format.",
        }),
    title: z
        .string({ message: "Title must be a string." })
        .trim()
        .min(1, "Title is required.")
        .max(255, "Title must not exceed 255 characters."),
    speaker: z
        .string({ message: "Speaker must be a string." })
        .trim()
        .max(255, "Speaker must not exceed 255 characters.")
        .optional()
        .or(z.literal("").transform(() => undefined)),
    color: z
        .string({ message: "Color must be a string." })
        .trim()
        .max(50, "Color must not exceed 50 characters.")
        .optional()
        .or(z.literal("").transform(() => undefined)),
});