const API_BASE = import.meta.env.VITE_API_URL;

export function resolveCmsAsset(src) {

    // verification de la scr
    if (!src) return "";

    // verification de la route (string)
    if (/^https?:\/\//.test(src)) return src;

    // verifie le dossier et ajoute le lien du back
    if (src.startsWith("/uploads/")) {
        // Le back enregistre les médias CMS dans uploads/medias/ ; si la valeur est /uploads/fichier.ext, on corrige
        const path = src.replace(/^\/uploads\/?/, "");
        const normalized = path.includes("/") ? src : `/uploads/medias/${path}`;
        return `${API_BASE}${normalized}`;
    }

    // Valeur en base = juste le nom de fichier (ex. 1770992600472-859095709.mp4) → on préfixe par uploads/medias
    if (typeof src === "string" && src.trim() && !src.includes("/")) {
        return `${API_BASE}/uploads/medias/${src.trim()}`;
    }

    return src;
    
}