// Fonction qui pré-remplie le formulaire
function buildInitialValuesFromCms(fields, cmsSection, options = {}) {
    const { fileFields = [], defaults = {} } = options;

    const obj = {};
    console.log(obj);

    for (const key of fields) {
        // valeur
        obj[key] = cmsSection?.[key] ?? "";

        // visibilité
        obj[`${key}_is_active`] = Number(cmsSection?.[`${key}_is_active`] ?? 1);
    }

    for (const f of fileFields) {

        obj[f] = null;
        
    }

    return { ...obj, ...defaults };
}

export default buildInitialValuesFromCms