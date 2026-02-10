import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

const uploadsRoot = path.join(process.cwd(), "uploads");
const newsletterDir = path.join(uploadsRoot, "newsletters");

if (!fs.existsSync(newsletterDir)) {
  fs.mkdirSync(newsletterDir, { recursive: true });
}

function safeExt(mimetype, originalname) {
  const ext = path.extname(originalname || "").toLowerCase();
  // simple whitelist
  if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) return ext;

  // fallback by mimetype
  if (mimetype === "image/png") return ".png";
  if (mimetype === "image/jpeg") return ".jpg";
  if (mimetype === "image/webp") return ".webp";
  return "";
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, newsletterDir),
  filename: (req, file, cb) => {
    const ext = safeExt(file.mimetype, file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext || ""}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const ok = ["image/png", "image/jpeg", "image/webp"].includes(
      file.mimetype,
    );
    cb(ok ? null : new Error("Format image non supporté (png/jpg/webp)"), ok);
  },
});

// POST /api/admin/newsletters/upload-image
router.post(
  "/admin/newsletters/upload-image",
  upload.single("image"),
  (req, res) => {
    if (!req.file) return res.status(400).json({ error: "Fichier manquant" });

    // Comme tu exposes déjà /uploads en statique dans app.js
    const publicUrl = `/uploads/newsletters/${req.file.filename}`;

    return res.status(201).json({
      message: "Upload OK",
      file: {
        filename: req.file.filename,
        url: publicUrl,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    });
  },
);

// Gestion erreur multer
router.use((err, req, res, next) => {
  if (!err) return next();
  return res.status(400).json({ error: err.message || "Erreur upload" });
});

export default router;
