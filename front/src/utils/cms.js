// fonction qui transforme une ligne en objet
export function buildCmsMap(rows, locale) {
    // objet vide
    const map = {};

    for (const row of rows) {
        
        if (!row) continue;

        // filtre par langue
        if (row.locale !== locale) continue;

        // récupére les infos utils
        const section = row.section;
        const key = row.content_key;

        // créer la section si elle n'existe pas
        if (!map[section]) map[section] = {};

        // gere les valeur
        map[section][key] = row.value;

        // gere le is_active pour la visibilité
        map[section][`${key}_is_active`] = Number(row.is_active ?? 1);

        // gere l'ordre
        map[section][`${key}_order_index`] = Number(row.order_index ?? 0);
    }

    return map;
}