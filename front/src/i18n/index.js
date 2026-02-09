import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import headerFR from "./locales/fr/header.json";
import headerEN from "./locales/en/header.json";
import homeFR from "./locales/fr/home.json";
import homeEN from "./locales/en/home.json";

// ✅ AJOUTE CES IMPORTS
import detailvideoFR from "./locales/fr/detailvideo.json";
import detailvideoEN from "./locales/en/detailvideo.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["fr", "en"],
    load: "languageOnly",
    interpolation: { escapeValue: false },

    // ✅ AJOUTE detailvideo DANS LES RESOURCES
    resources: {
      fr: { 
        header: headerFR,
        home: homeFR,
        detailvideo: detailvideoFR,
      },
      en: {
        header: headerEN,
        home: homeEN,
        detailvideo: detailvideoEN,
      },
    },

    // (optionnel mais propre)
    ns: ["header", "home", "detailvideo"],
    defaultNS: "home",

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },
  });

export default i18n;
