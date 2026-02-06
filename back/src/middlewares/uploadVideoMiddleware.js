import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crée un dossier s'il n'existe pas
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Nettoie le nom du fichier
function sanitizeFilename(originalName) {
  const base = path.basename(originalName);
  return base.replace(/[^a-zA-Z0-9._-]/g, "_");
}

// Vérifie les formats vidéo autorisés
function isAllowedVideo(file) {
  const ext = path.extname(file.originalname).toLowerCase();

  const okExt = [".mp4", ".webm", ".mov"].includes(ext);
  const okMime = ["video/mp4", "video/webm", "video/quicktime"].includes(
    file.mimetype,
  );

  return okExt || okMime;
}

// Vérifie les formats image autorisés
function isAllowedImage(file) {
  const ext = path.extname(file.originalname).toLowerCase();

  const okExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
  const okMime = ["image/jpeg", "image/png", "image/webp"].includes(
    file.mimetype,
  );

  return okExt || okMime;
}

// Vérifie que le fichier est un sous-titre .srt
function isAllowedSrt(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  return ext === ".srt";
}

// Définit les dossiers d'upload
const baseUploadFolder = path.join(__dirname, "..", "..", "uploads");

const videoFolder = path.join(baseUploadFolder, "videos");
const coverFolder = path.join(baseUploadFolder, "covers");
const stillsFolder = path.join(baseUploadFolder, "stills");
const subtitlesFolder = path.join(baseUploadFolder, "subtitles");

// Assure la création des dossiers nécessaires
[videoFolder, coverFolder, stillsFolder, subtitlesFolder].forEach(
  ensureDirExists,
);

// Configure le stockage des fichiers
const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.fieldname === "video") return cb(null, videoFolder);
    if (file.fieldname === "cover") return cb(null, coverFolder);
    if (file.fieldname === "stills") return cb(null, stillsFolder);
    if (file.fieldname === "subtitles") return cb(null, subtitlesFolder);

    return cb(new Error("FIELD_NOT_ALLOWED"));
  },

  filename(req, file, cb) {
    const safe = sanitizeFilename(file.originalname);
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

    cb(null, `${unique}-${safe}`);
  },
});

// Middleware multer pour gérer l'upload
const upload = multer({
  storage,

  limits: {
    fileSize: 300 * 1024 * 1024,
    files: 1 + 1 + 3 + 10,
  },

  fileFilter(req, file, cb) {
    if (file.fieldname === "video") {
      return isAllowedVideo(file)
        ? cb(null, true)
        : cb(new Error("VIDEO_TYPE_NOT_ALLOWED"));
    }

    if (file.fieldname === "cover" || file.fieldname === "stills") {
      return isAllowedImage(file)
        ? cb(null, true)
        : cb(new Error("IMAGE_TYPE_NOT_ALLOWED"));
    }

    if (file.fieldname === "subtitles") {
      return isAllowedSrt(file)
        ? cb(null, true)
        : cb(new Error("SRT_TYPE_NOT_ALLOWED"));
    }

    return cb(new Error("FIELD_NOT_ALLOWED"));
  },
});

export default upload;
