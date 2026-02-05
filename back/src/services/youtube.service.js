import path from "path";
import fs from "fs";
import { google } from "googleapis";
import { getOAuth2Client } from "../config/youtube.js";

const UPLOAD_DIR = path.resolve("uploads");

export async function uploadToYouTube({
  videoFile,
  title,
  description,
  coverFile,
  subtitlesFile,
}) {

  console.log("🚀 uploadToYouTube START");

  const videoPath = path.join(UPLOAD_DIR, "videos", videoFile);

  console.log("📂 VIDEO PATH:", videoPath);

  if (!fs.existsSync(videoPath)) {
    throw new Error("Fichier vidéo introuvable");
  }

  const auth = getOAuth2Client();

  console.log("🔐 OAuth client chargé");

  const youtube = google.youtube({ version: "v3", auth });

  // ✅ TEST AUTH YOUTUBE
  try {
    const me = await youtube.channels.list({
      part: "id,snippet",
      mine: true,
    });

    console.log(
      "✅ MY CHANNELS:",
      me.data.items?.map((c) => c.id)
    );

  } catch (err) {
    console.error("❌ AUTH YOUTUBE FAILED");
    console.error("Status:", err?.code);
    console.error("Data:", err?.response?.data);
    throw err;
  }

  // ✅ UPLOAD VIDEO
  let youtubeVideoId;

  try {

    console.log("📤 Upload vidéo vers YouTube...");

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

    console.log("✅ VIDEO UPLOADED:", youtubeVideoId);

  } catch (err) {

    console.error("❌ VIDEO INSERT FAILED");
    console.error("Status:", err?.code);
    console.error("Data:", err?.response?.data);

    throw err;
  }

  // ✅ THUMBNAIL
  if (coverFile) {

    const coverPath = path.join(UPLOAD_DIR, "images", coverFile);

    console.log("🖼 Thumbnail path:", coverPath);

    if (fs.existsSync(coverPath)) {
      try {
        await youtube.thumbnails.set({
          videoId: youtubeVideoId,
          media: {
            body: fs.createReadStream(coverPath),
          },
        });

        console.log("✅ THUMBNAIL UPLOADED");

      } catch (err) {
        console.warn("⚠️ Thumbnail upload failed");
        console.warn("Status:", err?.code);
        console.warn("Data:", err?.response?.data);
      }
    }
  }

  // ✅ SUBTITLES
  if (subtitlesFile) {

    const subtitlesPath = path.join(
      UPLOAD_DIR,
      "subtitles",
      subtitlesFile
    );

    console.log("📝 Subtitles path:", subtitlesPath);

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

        console.log("✅ SUBTITLES UPLOADED");

      } catch (err) {
        console.warn("⚠️ Subtitles upload failed");
        console.warn("Status:", err?.code);
        console.warn("Data:", err?.response?.data);
      }
    }
  }

  console.log("🏁 uploadToYouTube DONE");

  return youtubeVideoId;
}
