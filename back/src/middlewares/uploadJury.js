import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.resolve("uploads/jury");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safeExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext)
      ? ext
      : ".png";
    cb(
      null,
      `jury_${Date.now()}_${Math.random().toString(16).slice(2)}${safeExt}`,
    );
  },
});

function fileFilter(req, file, cb) {
  if (!file.mimetype?.startsWith("image/")) {
    return cb(new Error("Le fichier doit être une image"));
  }
  cb(null, true);
}

export const uploadJury = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
