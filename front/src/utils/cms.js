export function buildCmsMap(rows, locale) {
    const map = {};

    for (const row of rows) {
        
        if (row.locale !== locale) continue;

        if (!map[row.section]) map[row.section] = {};
        map[row.section][row.content_key] = row.value;
    }

    return map;
}