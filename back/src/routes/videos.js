import express from "express";
import testController from "../controllers/videos/test.controller.js";
import videosListController from "../controllers/videos/videosList.controller.js";
import oneVideoController from "../controllers/videos/oneVideo.controller.js";
import streamVideoController from "../controllers/videos/streamVideoController.js";
import uploadVideoController from "../controllers/videos/uploadVideo.controller.js";

import upload from "../middlewares/uploadVideoMiddleware.js";

const router = express.Router();

// Route de test
router.get("/test", testController);

// READ : liste publique des vidéos
router.get("/", videosListController);

// READ : détail d'une vidéo
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
  uploadVideoController
);

export default router;
