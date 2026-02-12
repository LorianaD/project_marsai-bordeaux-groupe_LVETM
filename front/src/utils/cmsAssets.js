const API_BASE = import.meta.env.VITE_API_URL;

export function resolveCmsAsset(src) {

    // verification de la scr
    if (!src) return "";

    // verification de la route (string)
    if (/^https?:\/\//.test(src)) return src;

    // verifie le dossier et ajoute le lien du back
    if (src.startsWith("/uploads/")) return `${API_BASE}${src}`;

    return src;
    
}