import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

    destination: (req, file, cb) => cb(null, "uploads/medias"),

    filename: (req, file, cb) => {

        const ext = path.extname(file.originalname).toLowerCase();

        const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

        cb(null, safeName);

    },

});

function fileFilter(req, file, cb) {

    const ok = file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/");

    if (!ok) {

        return cb(new Error("Only image/* or video/* files are allowed"), false);

    }

    cb(null, true);
}

const uploadMedia = multer({

  storage,

  fileFilter,

  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB (à adapter)

})

export default uploadMedia;