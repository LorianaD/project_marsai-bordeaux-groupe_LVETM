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
import adminVideoReviewsController from "../controllers/videos/adminVideoReviews.controller.js";

import getMyReviewController from "../controllers/videos/getMyReview.controller.js";
import upsertMyReviewController from "../controllers/videos/upsertMyReview.controller.js";

import upload from "../middlewares/uploadVideoMiddleware.js";
import verifyRecaptcha from "../middlewares/verifyRecaptcha.js";
import { verifyToken, isSelector, isAdminOrSelector, isAdmin } from "../utils/isAdmin.js";

//import du middleware zod
import { validate } from "../middlewares/zod/zodValidator.js";
//import des schémas zod
import { uploadFilmFilesSchema, createFilmSchema } from "../zodSchema/zodIndex.js";


const router = express.Router();

// Route de test
router.get("/test", testController);

// Routes admin
router.get("/admin", verifyToken, isAdminOrSelector, adminVideosListController);
router.get("/admin/leaderboard", verifyToken, isAdminOrSelector, adminLeaderboardController);
router.get("/admin/:id/reviews", verifyToken, isAdminOrSelector, adminVideoReviewsController);
router.get("/admin/:id", verifyToken, isAdminOrSelector, adminOneVideoController);
router.patch("/admin/:id/status", verifyToken, isAdminOrSelector, patchVideoStatusController);
router.patch("/admin/:id/featured", verifyToken, isAdminOrSelector, patchVideoFeaturedController);


/* =====================================================
    REVIEW SELECTIONNEUR
===================================================== */

router.get("/:id/review/me", verifyToken, isSelector, getMyReviewController);

router.put("/:id/review", verifyToken, isSelector, upsertMyReviewController);

// Liste publique
router.get("/", videosListController);

// Détail public
router.get("/:id", oneVideoController);

// Streaming
router.get("/:id/stream", streamVideoController);

// Upload
router.post(
  "/",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "cover", maxCount: 1 },
    { name: "stills", maxCount: 10 },
    { name: "subtitles", maxCount: 1 },
  ]),
  verifyRecaptcha,
  validate([createFilmSchema, uploadFilmFilesSchema], { includeFile: true }),
  uploadVideoController,
);

export default router;
