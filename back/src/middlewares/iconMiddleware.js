import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/icons");

    },

    filename: (req, file, cb) => {

        const ext = path.extname(file.originalname).toLowerCase();

        const base = path

            .basename(file.originalname, ext)
            .replaceAll(/[^\w-]/g, "");

        cb(null, `${Date.now()}-${base}${ext}`);

    },

});

function fileFilter(req, file, cb) {

    const allowed = ["image/png", "image/svg+xml", "image/jpeg", "image/jpg", "image/webp"];

    if (allowed.includes(file.mimetype)) {

        return cb(null, true);
        
    }

    cb(new Error("Only PNG or SVG files are allowed"), false);

}

const uploadIcon = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2*1024 * 1024 },
});

export default uploadIcon;