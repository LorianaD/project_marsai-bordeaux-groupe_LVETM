// src/app.js
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

// Dossier uploads
const uploadsDir = path.join(__dirname, "..", "uploads");
console.log("STATIC /uploads ->", uploadsDir);
app.use("/uploads", express.static(uploadsDir));

// --------------------
// CORS (fix credentials include)
// --------------------
const FRONT_ORIGIN = process.env.FRONT_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: FRONT_ORIGIN, // ⚠️ pas "*"
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Preflight (⚠️ pas "*" sinon crash path-to-regexp)
app.options(/.*/, cors({ origin: FRONT_ORIGIN, credentials: true }));

// --------------------
// Middlewares globaux
// --------------------
app.use(express.json());
app.use(morgan("dev"));

// Route test serveur
app.get("/", (req, res) => {
  res.json({ message: "the site is running" });
});

// Routes API principales
app.use("/api", router);

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
