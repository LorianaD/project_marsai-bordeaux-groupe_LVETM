  /*****************************************************
  ** Validation des données du partenaire commercial **
 *****************************************************/
import { z } from "zod";

export const createPartnerSchema = z.object({
    name: z
        .string({message:"Name must be a string."})
        .trim()
        .min(1,"Name is required.")
        .max(255, "Name must not exceed 255 characters."),

    url: z
        .string({ message: "Url must be a string." })
        .trim()
        .min(1, "Url is required.")
        .max(255, "Url must not exceed 255 characters.")
        .url({ message: "Url must be a valid URL." }),
})