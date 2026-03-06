// fonction qui transforme une ligne en objet
export function buildCmsMap(rows, locale) {
    // objet vide
    const map = {};

    for (const row of rows) {
        
        if (!row) continue;

        // filtre par langue
        if (row.locale !== locale) continue;

        // récupére les infos utils
        const page = row.page;
        const section = row.section;
        const key = row.content_key;

        if (!page || !section || !key) continue;

        // créer la page si elle n'existe pas
        if (!map[page]) map[page] = {};

        // crée section si elle n'existe pas
        if (!map[page][section]) map[page][section] = {};

        // gere les valeur
        map[page][section][key] = row.value;

        // gere le is_active pour la visibilité
        map[page][section][`${key}_is_active`] = Number(row.is_active ?? 1);

        // gere l'ordre
        map[page][section][`${key}_order_index`] = Number(row.order_index ?? 0);
    }

    return map;
}