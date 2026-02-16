import uploadIcon from "./iconMiddleware.js";
import uploadMedia from "./mediaMiddleware.js";

// utilitaire : exécute un middleware multer seulement si besoin
function run(mw) {
    return (req, res, next) => mw(req, res, next);
}

function cmsUploadMiddleware(req, res, next) {

    const { content_key } = req.params;

    // "media" (background video/image/gif)
    if (content_key === "media") {
        return run(uploadMedia.single("file"))(req, res, next);
    }

    // icônes (png/svg)
    const isIcon = content_key.includes("icon") || content_key.includes("signe");

    if (isIcon) {
        return run(uploadIcon.single("file"))(req, res, next);
    }

    return next();
}

export default cmsUploadMiddleware