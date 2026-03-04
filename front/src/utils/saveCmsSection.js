import { updateContentApi, updateImageApi } from "../services/CMS/UpdateContentApi";
import { localesToSave } from "./cmsLocales";

// Sauvegarde une section CMS (text + files) pour un formulaire.
async function saveCmsSection({ page, section, locale, fields, values }) {
    for (let i = 0; i < fields.length; i++) {
        const key = fields[i];
        const val = values[key];

        const targetLocales = localesToSave(key, locale);

        let is_active;

        // cherche la key est verifie si elle contient card + un numéro +_
        const cardMatch = key.match(/^card(\d+)_/);
        
        if (cardMatch) {
            is_active = values[`card${cardMatch[1]}_title_is_active`];
        } else {
            is_active = values[`${key}_is_active`];
        }



        // IMAGE
        if (val instanceof File) {

            for (const loc of targetLocales) {

                await updateImageApi({
                    page,
                    section,
                    locale: loc,
                    content_key: key,
                    value: val,
                    order_index: i,
                    is_active,
                });

            }

            continue;
        
        }

        // TEXTE VIDE
        const empty = val === undefined || val === null || String(val).trim() === "";

        // si vide on continue sans rien changer
        if (empty) continue;

        // TEXTE NON VIDE
        for (const loc of targetLocales) {
            await updateContentApi({
                page,
                section,
                locale: loc,
                content_key: key,
                value: val,
                order_index: i,
                is_active,    
            });
        }
        
        // console.log("SEND:", key, val, targetLocales);

    }
}

export default saveCmsSection