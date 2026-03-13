 /**********************************************
 **** Regroupement de tout les schema zod *****
**********************************************/

//Validation des données user.
export { emailSchema, createUserSchema, createUserSnakeSchema, createUserJurySchema, roleSchema, passwordSchema} from "./userValidationSchema.js";

//Validation des ajouts dans admin_video.
export { createAdminVideoSchema } from "./adminVideoValidationSchema.js";

//Validation des ajouts d'awards.
export { createAwardSchema } from "./awardValidationSchema.js";

//Validation des ajouts des events.
export { createEventSchema } from "./eventValidationSchema.js";
//Validation de la publication d'un event.
export { publishEventSchema } from "./eventValidationSchema.js";

//Validation des données de la faq.
export { createFaqSchema } from "./faqValidationSchema.js";

//Validation des données de la vidéo.
export { createFilmSchema } from "./filmValidationSchema.js";

//Validation des données des jurés.
export { createJurySchema } from "./juryCreationValidation.js";
//validation des données des images des jurés.
export { juryImageSchema, fileJuryImageSchema, optionalFileJuryImageSchema } from "./imageValidationSchema.js";

//Validation des ajouts dans memo_selector.
export { createMemoSelectorSchema } from "./memoSelectorValidationSchema.js";

//Validation des données du partenaire commercial.
export { createPartnerSchema } from "./partnerValidationSchema.js";
//validation des données des images des partenaires commercial.
export { partnerImageSchema, filePartnerImageSchema, optionalFilePartnerImageSchema } from "./imageValidationSchema.js";

//Validation des données des liens social media.
export { createSocialMediaSchema} from "./socialMediaValidationSchema.js";

//validation des données du formulaire de contact.
export { contactSchema } from "./contactValidationSchema.js";

//validation des données de la newsletter.
export { consentSchema } from "./consentValidationSchema.js";

//validation des données du CMS.
export { cmsTextUpdateSchema, cmsActiveUpdateSchema, cmsFileUpdateSchema } from "./cmsValidationSchema.js";