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

import upload from "../middlewares/uploadVideoMiddleware.js";

const router = express.Router();

// ======================================================
// TEST
// ======================================================
router.get("/test", testController);

// ======================================================
// ADMIN (toutes les routes admin sont sous /admin)
// Important : toujours placer ces routes AVANT "/:id"
// ======================================================
router.get("/admin", adminVideosListController);
router.get("/admin/:id", adminOneVideoController);
router.patch("/admin/:id/status", patchVideoStatusController);
router.patch("/admin/:id/featured", patchVideoFeaturedController);

// ======================================================
// PUBLIC
// ======================================================

// READ : liste publique des vidéos (Published uniquement)
router.get("/", videosListController);

// READ : détail public d'une vidéo (Published uniquement)
router.get("/:id", oneVideoController);

// STREAM : lecture vidéo (range)
router.get("/:id/stream", streamVideoController);

// CREATE : upload complet
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
