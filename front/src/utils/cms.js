export function buildCmsMap(rows, locale) {
    const map = {};

    for (const row of rows) {
        
        if (!row) continue;
        if (row.locale !== locale) continue;

        const section = row.section;
        const key = row.content_key;

        if (!map[section]) map[section] = {};

        // gere les valeur
        map[section][key] = row.value;

        // gere le is_active pour la visibilité
        map[section][`${key}_is_active`] = Number(row.is_active ?? 1);

        // gere 
        map[section][`${key}_order_index`] = Number(row.order_index ?? 0);
    }

    return map;
}