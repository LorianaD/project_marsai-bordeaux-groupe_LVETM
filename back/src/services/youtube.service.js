import path from "path";
import fs from "fs";
import { google } from "googleapis";
import { getOAuth2Client } from "../config/youtube.js";

const UPLOAD_DIR = path.resolve("uploads");

// Upload une vidéo sur YouTube avec thumbnail et sous-titres
export async function uploadToYouTube({
  videoFile,
  title,
  description,
  coverFile,
  subtitlesFile,
}) {
  const videoPath = path.join(UPLOAD_DIR, "videos", videoFile);

  if (!fs.existsSync(videoPath)) {
    throw new Error("Fichier vidéo introuvable");
  }

  const auth = getOAuth2Client();
  const youtube = google.youtube({ version: "v3", auth });

  // Vérifie l'authentification YouTube
  try {
    await youtube.channels.list({
      part: "id,snippet",
      mine: true,
    });
  } catch (err) {
    throw err;
  }

  // Upload de la vidéo
  let youtubeVideoId;

  try {
    const res = await youtube.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: {
          title,
          description,
        },
        status: {
          privacyStatus: "private",
        },
      },
      media: {
        body: fs.createReadStream(videoPath),
      },
    });

    youtubeVideoId = res.data.id;
  } catch (err) {
    throw err;
  }

  // Upload du thumbnail si présent
  if (coverFile) {
    const coverPath = path.join(UPLOAD_DIR, "images", coverFile);

    if (fs.existsSync(coverPath)) {
      try {
        await youtube.thumbnails.set({
          videoId: youtubeVideoId,
          media: {
            body: fs.createReadStream(coverPath),
          },
        });
      } catch (err) {}
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
      } catch (err) {}
    }
  }

  return youtubeVideoId;
}
