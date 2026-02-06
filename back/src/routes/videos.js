import express from "express";

import testController from "../controllers/videos/test.controller.js";
import videosListController from "../controllers/videos/videosList.controller.js";
import oneVideoController from "../controllers/videos/oneVideo.controller.js";
import streamVideoController from "../controllers/videos/streamVideoController.js";
import uploadVideoController from "../controllers/videos/uploadVideo.controller.js";

import adminVideosListController from "../controllers/videos/adminVideosList.controller.js";
import adminOneVideoController from "../controllers/videos/adminOneVideo.controller.js";
import patchVideoStatusController from "../controllers/videos/patchVideoStatus.controller.js";
import patchVideoFeaturedController from "../controllers/videos/patchVideoFeatured.controller.js";
import adminLeaderboardController from "../controllers/videos/adminLeaderboard.controller.js";

import upload from "../middlewares/uploadVideoMiddleware.js";

const router = express.Router();

// Route de test
router.get("/test", testController);

// Routes admin pour gestion complète des vidéos
router.get("/admin", adminVideosListController);
router.get("/admin/leaderboard", adminLeaderboardController);
router.get("/admin/:id", adminOneVideoController);
router.patch("/admin/:id/status", patchVideoStatusController);
router.patch("/admin/:id/featured", patchVideoFeaturedController);

// Liste publique des vidéos publiées
router.get("/", videosListController);

// Détail public d'une vidéo publiée
router.get("/:id", oneVideoController);

// Streaming vidéo
router.get("/:id/stream", streamVideoController);

// Upload complet d'une vidéo
router.post(
  "/",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "cover", maxCount: 1 },
    { name: "stills", maxCount: 10 },
    { name: "subtitles", maxCount: 1 },
  ]),
  uploadVideoController,
);

export default router;
