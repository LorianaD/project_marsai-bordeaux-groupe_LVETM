import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import headerFR from "./locales/fr/header.json";
import headerEN from "./locales/en/header.json";

import footerFR from "./locales/fr/footer.json";
import footerEN from "./locales/en/footer.json";

import homeFR from "./locales/fr/home.json";
import homeEN from "./locales/en/home.json";

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

    resources: {
      fr: {
        header: headerFR,
        footer: footerFR,
        home: homeFR,
        detailvideo: detailvideoFR,
      },
      en: {
        header: headerEN,
        footer: footerEN,
        home: homeEN,
        detailvideo: detailvideoEN,
      },
    },

   
    ns: ["header", "footer", "home", "detailvideo"],
    defaultNS: "home",

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },
  });

export default i18n;
