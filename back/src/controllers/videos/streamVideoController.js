import fs from "fs";
import path from "path";
import videosModel from "../../models/videos.model.js";


function getVideoBaseDir() {
  // 1) si tu as une variable d'env, ok
  if (process.env.VIDEO_DIR) return process.env.VIDEO_DIR;
  // 2) sinon on colle au middleware multer : /uploads/videos
  return path.join(process.cwd(), "uploads", "videos");
}

async function streamVideoController(req, res) {
  try {
    const { id } = req.params;
    const range = req.headers.range;

    const video = await videosModel.findVideoFileById(id);
    if (!video) {
      return res.status(404).json({ error: "Vidéo introuvable" });
    }

    // si ton model renvoie aussi upload_status, active ça :
    if (video.upload_status && video.upload_status !== "Published") {
      return res.status(403).json({ error: "Vidéo non disponible" });
    }

    const videoPath = path.join(getVideoBaseDir(), video.video_file_name);

    let stat;
    try {
      stat = fs.statSync(videoPath);
    } catch {
      return res
        .status(404)
        .json({ error: "Fichier vidéo introuvable sur le serveur" });
    }

    const fileSize = stat.size;

    // Si pas de Range : on envoie tout (200)
    if (!range) {
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes",
      });
      fs.createReadStream(videoPath).pipe(res);
      return;
    }

    // Range parser correct : "bytes=start-end"
    const match = String(range).match(/bytes=(\d+)-(\d*)/);
    if (!match) {
      return res.status(416).json({ error: "Range invalide" });
    }

    const start = Number(match[1]);
    const requestedEnd = match[2] ? Number(match[2]) : null;

    const CHUNK_SIZE = 10 ** 6; // 1MB (tu peux monter à 5-10MB)
    const end = Math.min(requestedEnd ?? start + CHUNK_SIZE - 1, fileSize - 1);

    if (start >= fileSize || end < start) {
      return res.status(416).set("Content-Range", `bytes */${fileSize}`).end();
    }

    const stream = fs.createReadStream(videoPath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    });

    stream.pipe(res);
  } catch (error) {
    console.error("streamVideoController error:", error);
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
}

export default streamVideoController;
