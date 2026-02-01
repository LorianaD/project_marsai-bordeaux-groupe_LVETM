import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import headerFR from "./locales/fr/header.json";
import headerEN from "./locales/en/header.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["fr", "en"],
    load: "languageOnly",
    interpolation: { escapeValue: false },

    resources: {
      fr: { header: headerFR },
      en: { header: headerEN },
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },
  });

export default i18n;