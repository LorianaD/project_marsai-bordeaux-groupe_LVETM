import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/logoPartners"),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const base = path
            .basename(file.originalname, ext)
            .replaceAll("","")
            .replaceAll(/[^\w-]/g, "");
        cb(null, `${Date.now()}-${base}${ext}`);
    },
});

function fileFilter(req, file, cb) {
    if(file.mimetype === "image/png") return cb(null, true);
    cb(new Error("Only PNG files are allowed"), false);
}

const uploadPartner = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2*1024 * 1024 },
});

export default uploadPartner;