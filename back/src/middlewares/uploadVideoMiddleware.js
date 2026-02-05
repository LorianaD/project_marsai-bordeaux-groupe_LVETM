// Multer = librairie qui permet de gérer l’upload de fichiers (images, vidéos, etc.)
import multer from "multer";

// path = pour manipuler proprement les chemins de fichiers
import path from "path";

// fs = pour interagir avec le système de fichiers (créer des dossiers, vérifier s’ils existent…)
import fs from "fs";

// nécessaire pour récupérer __dirname en ES modules
import { fileURLToPath } from "url";

// on recrée __filename et __dirname (car en ES modules ils n’existent pas par défaut)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------------------------------------------------------
//  FONCTION : vérifier qu’un dossier existe
// Si le dossier n’existe pas encore, on le crée automatiquement
// Ça évite les crashes au moment de l’upload
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// -------------------------------------------------------------------
//  FONCTION : nettoyer le nom du fichier
// Le but : éviter les accents, espaces ou caractères bizarres
// On remplace tout par des "_" si besoin
function sanitizeFilename(originalName) {
  const base = path.basename(originalName);
  return base.replace(/[^a-zA-Z0-9._-]/g, "_");
}

// -------------------------------------------------------------------
//  FONCTION : vérifier que le fichier vidéo est autorisé
// On accepte certains formats vidéo seulement
function isAllowedVideo(file) {
  // extension du fichier
  const ext = path.extname(file.originalname).toLowerCase();

  // extensions autorisées
  const okExt = [".mp4", ".webm", ".mov"].includes(ext);

  // types MIME autorisés
  const okMime = [
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ].includes(file.mimetype);

  // si l’un des deux est OK → on accepte
  return okExt || okMime;
}

// -------------------------------------------------------------------
//  FONCTION : vérifier que le fichier image est autorisé
// Utilisé pour les covers et les stills
function isAllowedImage(file) {
  const ext = path.extname(file.originalname).toLowerCase();

  const okExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
  const okMime = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype);

  return okExt || okMime;
}

// -------------------------------------------------------------------
//  FONCTION : vérifier que les sous-titres sont bien en .srt
function isAllowedSrt(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  return ext === ".srt";
}

// -------------------------------------------------------------------
//  DÉFINITION DES DOSSIERS D’UPLOAD
// Tous les fichiers sont stockés dans /uploads, mais séparés par type
const baseUploadFolder = path.join(__dirname, "..", "..", "uploads");

const videoFolder = path.join(baseUploadFolder, "videos");
const coverFolder = path.join(baseUploadFolder, "covers");
const stillsFolder = path.join(baseUploadFolder, "stills");
const subtitlesFolder = path.join(baseUploadFolder, "subtitles");

// -------------------------------------------------------------------
//  On s’assure que TOUS les dossiers existent
// S’ils n’existent pas, on les crée au démarrage du serveur
[videoFolder, coverFolder, stillsFolder, subtitlesFolder].forEach(ensureDirExists);

// -------------------------------------------------------------------
//  CONFIGURATION DU STOCKAGE AVEC MULTER
// Ici on dit à multer :
// - dans quel dossier mettre chaque type de fichier
// - comment renommer les fichiers
const storage = multer.diskStorage({
  // où stocker chaque fichier selon son champ
  destination(req, file, cb) {
    if (file.fieldname === "video") return cb(null, videoFolder);
    if (file.fieldname === "cover") return cb(null, coverFolder);
    if (file.fieldname === "stills") return cb(null, stillsFolder);
    if (file.fieldname === "subtitles") return cb(null, subtitlesFolder);

    // si le champ n’est pas reconnu → erreur
    return cb(new Error("FIELD_NOT_ALLOWED"));
  },

  // comment renommer le fichier une fois uploadé
  filename(req, file, cb) {
    // on nettoie le nom d’origine
    const safe = sanitizeFilename(file.originalname);

    // on ajoute un identifiant unique pour éviter les doublons
    const unique = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

    // nom final enregistré sur le serveur
    cb(null, `${unique}-${safe}`);
  },
});

// -------------------------------------------------------------------
//  MIDDLEWARE MULTER FINAL
// C’est CE middleware qui sera utilisé dans les routes
const upload = multer({
  storage,

  // limites de sécurité
  limits: {
    // taille max par fichier : 300 Mo
    fileSize: 300 * 1024 * 1024,

    // nombre max de fichiers :
    // 1 vidéo
    // 1 cover
    // 3 stills
    // 10 sous-titres
    files: 1 + 1 + 3 + 10,
  },

  // filtre pour vérifier les types de fichiers AVANT l’upload
  fileFilter(req, file, cb) {
    // si c’est une vidéo
    if (file.fieldname === "video") {
      return isAllowedVideo(file)
        ? cb(null, true)
        : cb(new Error("VIDEO_TYPE_NOT_ALLOWED"));
    }

    // si c’est une image (cover ou still)
    if (file.fieldname === "cover" || file.fieldname === "stills") {
      return isAllowedImage(file)
        ? cb(null, true)
        : cb(new Error("IMAGE_TYPE_NOT_ALLOWED"));
    }

    // si c’est un sous-titre
    if (file.fieldname === "subtitles") {
      return isAllowedSrt(file)
        ? cb(null, true)
        : cb(new Error("SRT_TYPE_NOT_ALLOWED"));
    }

    // tout le reste est refusé
    return cb(new Error("FIELD_NOT_ALLOWED"));
  },
});

// -------------------------------------------------------------------
//  On exporte le middleware pour l’utiliser dans les routes
export default upload;
