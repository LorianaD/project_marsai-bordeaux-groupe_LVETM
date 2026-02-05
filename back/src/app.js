import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import notFound from "./middlewares/notFound.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Définit le dossier contenant les fichiers uploadés
const uploadsDir = path.join(__dirname, "..", "uploads");

console.log("STATIC /uploads ->", uploadsDir);

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Route test serveur
app.get("/", (req, res) => {
  res.json({
    message: "the site is running",
  });
});

// Rend accessible le dossier uploads en statique
app.use("/uploads", express.static(uploadsDir));

// Routes API principales
app.use("/api", router);

// Middleware 404
app.use(notFound);

// Gestion globale des erreurs serveur
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Erreur serveur",
    details: err.message,
  });
});

export default app;
