import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // AJOUT: pour reconstruire __dirname en ES Modules
import router from "./routes/index.js";
import notFound from "./middlewares/notFound.js";

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  on pointe exactement vers back/uploads (sans dépendre du dossier de lancement)
const uploadsDir = path.join(__dirname, "..", "uploads");

// log utile pour vérifier où Express sert les fichiers
console.log("STATIC /uploads ->", uploadsDir);

// middlewares globaux
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// route test
app.get("/", (req, res) => {
  res.json({
    message: "the site is running"
  });
});

//  maintenant /uploads va lire dans back/uploads
app.use("/uploads", express.static(uploadsDir));

// routes API
app.use("/api", router);

// 404
app.use(notFound);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Erreur serveur",
    details: err.message,
  });
});

export default app;
