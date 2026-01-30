import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";


import router from "./routes/index.js";
import videosRouter from "./routes/videos.js";
import notFound from "./middlewares/notFound.js";

const app = express();

// middlewares globaux
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// route root
app.get("/", (req, res) => {
  res.json({ message: "the site is running" });
});

app.use("/uploads", express.static(path.resolve("uploads")));

// routes API
app.use("/api", router);
app.use("/api", videosRouter);

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
