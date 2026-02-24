import path from "path";
import fs from "fs";
import { google } from "googleapis";
import { getOAuth2Client } from "../config/youtube.js";
import { getObjectFromS3 } from "./scalewayS3.service.js";

const UPLOAD_DIR = path.resolve("uploads");

// Petit helper: détecte si c’est une clé S3 (contient "/" ou commence par le folder)
function looksLikeS3Key(str) {
  const s = String(str || "");
  if (s.includes("/")) return true;
  const folder = (process.env.SCALEWAY_FOLDER || "").replace(/\/+$/, "");
  return folder ? s.startsWith(folder + "/") : false;
}

// Retourne un stream lisible de vidéo
async function getVideoReadStream(videoFile) {
  // Cas 1: nouveau comportement → videoFile est une clé S3 (ex: grp4/videos/xxx.mp4)
  if (looksLikeS3Key(videoFile)) {
    const obj = await getObjectFromS3({ key: videoFile });
    if (!obj?.Body) throw new Error("Impossible de lire la vidéo depuis S3");
    return obj.Body; // stream
  }

  // Cas 2: ancien comportement → videoFile est un nom local (ex: xxx.mp4)
  const videoPath = path.join(UPLOAD_DIR, "videos", videoFile);

  if (!fs.existsSync(videoPath)) {
    throw new Error("Fichier vidéo introuvable (local)");
  }

  return fs.createReadStream(videoPath);
}

// Upload une vidéo sur YouTube avec thumbnail et sous-titres
export async function uploadToYouTube({
  videoFile,
  title,
  description,
  coverFile,
  subtitlesFile,
}) {
  const auth = getOAuth2Client();
  const youtube = google.youtube({ version: "v3", auth });

  // Vérifie l'authentification YouTube
  await youtube.channels.list({
    part: "id,snippet",
    mine: true,
  });

  // Stream vidéo (local ou S3)
  const videoStream = await getVideoReadStream(videoFile);

  // Upload de la vidéo
  let youtubeVideoId;
  const res = await youtube.videos.insert({
    part: "snippet,status",
    requestBody: {
      snippet: { title, description },
      status: { privacyStatus: "private" },
    },
    media: { body: videoStream },
  });

  youtubeVideoId = res.data.id;

  // Upload du thumbnail si présent
  if (coverFile) {
    // ⚠️ Dans ton projet, le cover est stocké dans uploads/covers (pas uploads/images)
    const coverPath = path.join(UPLOAD_DIR, "covers", coverFile);

    if (fs.existsSync(coverPath)) {
      try {
        await youtube.thumbnails.set({
          videoId: youtubeVideoId,
          media: {
            body: fs.createReadStream(coverPath),
          },
        });
      } catch (err) {
        // non bloquant
      }
    }
  }

  // Upload des sous-titres si présents
  if (subtitlesFile) {
    const subtitlesPath = path.join(UPLOAD_DIR, "subtitles", subtitlesFile);

    if (fs.existsSync(subtitlesPath)) {
      try {
        await youtube.captions.insert({
          part: "snippet",
          requestBody: {
            snippet: {
              videoId: youtubeVideoId,
              language: "fr",
              name: "Français",
            },
          },
          media: {
            mimeType: "application/x-subrip",
            body: fs.createReadStream(subtitlesPath),
          },
        });
      } catch (err) {
        // non bloquant
      }
    }
  }

  return youtubeVideoId;
}
