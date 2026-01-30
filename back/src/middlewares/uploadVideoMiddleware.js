import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function sanitizeFilename(originalName) {
  const base = path.basename(originalName);
  return base.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function isAllowedVideo(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  const okExt = [".mp4", ".webm", ".mov"].includes(ext);
  const okMime = ["video/mp4", "video/webm", "video/quicktime"].includes(file.mimetype);
  return okExt || okMime;
}

function isAllowedImage(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  const okExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
  const okMime = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype);
  return okExt || okMime;
}

function isAllowedSrt(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  return ext === ".srt";
}

const baseUploadFolder = path.join(__dirname, "..", "..", "uploads");
const videoFolder = path.join(baseUploadFolder, "videos");
const coverFolder = path.join(baseUploadFolder, "covers");
const stillsFolder = path.join(baseUploadFolder, "stills");
const subtitlesFolder = path.join(baseUploadFolder, "subtitles");

[videoFolder, coverFolder, stillsFolder, subtitlesFolder].forEach(ensureDirExists);

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

const upload = multer({
  storage,
  limits: {
    // limite par fichier (multer limite par file)
    fileSize: 300 * 1024 * 1024, // 300MB
    files: 1 + 1 + 10 + 1, // video + cover + stills + subtitles (max)
  },
  fileFilter(req, file, cb) {
    if (file.fieldname === "video") {
      return isAllowedVideo(file) ? cb(null, true) : cb(new Error("VIDEO_TYPE_NOT_ALLOWED"));
    }
    if (file.fieldname === "cover" || file.fieldname === "stills") {
      return isAllowedImage(file) ? cb(null, true) : cb(new Error("IMAGE_TYPE_NOT_ALLOWED"));
    }
    if (file.fieldname === "subtitles") {
      return isAllowedSrt(file) ? cb(null, true) : cb(new Error("SRT_TYPE_NOT_ALLOWED"));
    }
    return cb(new Error("FIELD_NOT_ALLOWED"));
  },
});

export default upload;
