import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// je m'assure que le dossier existe, sinon je le crée
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

// je nettoie le nom du fichier pour éviter les caractères chelous
function sanitizeFilename(originalName) {
  const base = path.basename(originalName);
  return base.replace(/[^a-zA-Z0-9._-]/g, "_");
}

// je vérifie si c'est un format vidéo OK
function isAllowedVideo(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  const okExt = [".mp4", ".webm", ".mov"].includes(ext);
  const okMime = ["video/mp4", "video/webm", "video/quicktime"].includes(file.mimetype);
  return okExt || okMime;
}

// je vérifie si c'est une image OK
function isAllowedImage(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  const okExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
  const okMime = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype);
  return okExt || okMime;
}

// je vérifie si c'est un sous-titre .srt
function isAllowedSrt(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  return ext === ".srt";
}

// je définis où je stocke les uploads
const baseUploadFolder = path.join(__dirname, "..", "..", "uploads");
const videoFolder = path.join(baseUploadFolder, "videos");
const coverFolder = path.join(baseUploadFolder, "covers");
const stillsFolder = path.join(baseUploadFolder, "stills");
const subtitlesFolder = path.join(baseUploadFolder, "subtitles");

// je crée les dossiers s'ils n'existent pas
[videoFolder, coverFolder, stillsFolder, subtitlesFolder].forEach(ensureDirExists);

// je dis à multer où ranger chaque type de fichier + comment les renommer
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

// middleware multer final
const upload = multer({
  storage,
  limits: {
    fileSize: 300 * 1024 * 1024, // 300MB max par fichier
    files: 1 + 1 + 3 + 10, // video + cover + stills (max 3) + subtitles (max 10)
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
