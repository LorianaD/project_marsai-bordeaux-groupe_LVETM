const exactSharedKeys = new Set([
    "start_date",
    "end_date",
]);

export const isSharedKey = (key) =>
    exactSharedKeys.has(key) ||
    key.endsWith("_color") ||
    key.endsWith("_link") ||
    key.endsWith("_icon") ||
    key.endsWith("_image") ||
    key.endsWith("_media");

export const localesToSave = (key, locale) => isSharedKey(key) ? ["fr", "en"] : [locale];