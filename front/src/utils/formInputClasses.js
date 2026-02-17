/**
 * Classes Tailwind partagées pour les champs de formulaire.
 * Utilise les variantes :required, :invalid, :disabled, :focus avec le rose du site (#F6339A).
 * À utiliser sur <input> et <textarea> pour un style cohérent sans logique conditionnelle.
 */

export const inputBaseClasses =
  "w-full rounded-xl border bg-black/5 px-4 py-2 text-black dark:bg-white/5 dark:text-white " +
  "placeholder:text-black/40 dark:placeholder:text-white/40 " +
  "transition-all duration-200 " +
  // Obligatoire : bordure rose légère
  "required:border-[#F6339A]/40 required:dark:border-[#F6339A]/50 " +
  // Invalide (ex. email invalide, required vide après submit)
  "invalid:border-[#F6339A] invalid:text-[#F6339A]/90 invalid:dark:border-[#F6339A] invalid:dark:text-[#F6339A] " +
  "focus:outline-none focus:ring-2 focus:ring-[#F6339A]/50 focus:border-[#F6339A]/60 " +
  "focus:invalid:border-[#F6339A] focus:invalid:ring-[#F6339A]/50 " +
  // Désactivé
  "disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none " +
  "dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 dark:disabled:text-gray-400 " +
  // Bordure par défaut
  "border-black/20 dark:border-[#F6339A]/60";

/** Variante pour inputs sur fond blanc (login, etc.) */
export const inputLightClasses =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-2 text-black " +
  "placeholder:text-black/40 dark:placeholder:text-white/40 " +
  "transition-all duration-200 " +
  "required:border-[#F6339A]/40 required:dark:border-[#F6339A]/50 " +
  "invalid:border-[#F6339A] invalid:text-[#F6339A]/90 invalid:dark:border-[#F6339A] " +
  "focus:outline-none focus:ring-2 focus:ring-[#F6339A]/50 focus:border-[#F6339A]/60 " +
  "focus:invalid:border-[#F6339A] focus:invalid:ring-[#F6339A]/50 " +
  "disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed " +
  "dark:border-white/10 dark:bg-black/30 dark:text-white";

/** Variante pour formulaires CMS (style existant + variantes) */
export const inputCmsClasses =
  "flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] w-full " +
  "placeholder:uppercase placeholder:text-[rgba(255,255,255,0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] " +
  "border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px] " +
  "required:border-[#F6339A]/40 invalid:border-[#F6339A] invalid:text-[#F6339A]/90 " +
  "focus:outline-none focus:ring-2 focus:ring-[#F6339A]/50 focus:border-[#F6339A]/60 " +
  "disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-800/20";
