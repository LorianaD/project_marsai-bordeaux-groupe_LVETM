/********************************************* 
 * Regroupement de tout les schema zod
 *********************************************/

//Validation des données d'ajouts d'admin.
export { createAdminSchema } from "./adminCreationValidationSchema.js";

//Validation des ajouts dans admin_video.
export { createAdminVideoSchema } from "./adminVideoValidationSchema.js";

//Validation des ajouts d'awards.
export { createAwardSchema } from "./awardValidationSchema.js";

//Validation des emails.
export { createEmailSchema } from "./emailValidationSchema.js";

//Validation des ajouts des events.
export { createEventSchema } from "./eventValidationSchema.js";

//Validation des données de la faq.
export { createFaqSchema } from "./faqValidationSchema.js";

//Validation des données de la vidéo.
export { createFilmSchema } from "./filmValidationSchema.js";

//Validation des données des jurés.
export { createJurySchema } from "./juryCreationValidation.js";

//Validation des ajouts dans memo_selector.
export { createMemoSelectorSchema } from "./memoSelectorValidationSchema.js";

//Validation des données du partenaire commercial.
export { createPartenerSchema } from "./partenerValidationSchema.js";

//Validation des données des liens social media.
export { createSocialMediaSchema} from "./socialMediaValidationSchema.js";

