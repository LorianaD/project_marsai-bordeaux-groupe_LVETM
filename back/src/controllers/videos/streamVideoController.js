import videosModel from "../../models/videos.model.js";
import { getObjectFromS3 } from "../../services/scalewayS3.service.js";

async function streamVideoController(req, res) {
  try {
    const { id } = req.params;
    const range = req.headers.range;

    const video = await videosModel.findVideoFileById(id);

    if (!video) {
      return res.status(404).json({ error: "Vidéo introuvable" });
    }

    if (video.upload_status !== "Published") {
      return res.status(403).json({ error: "Vidéo non disponible" });
    }

    const key = video.video_file_name;

    // IMPORTANT : HTML video exige Range
    if (!range) {
      return res.status(416).json({
        error: "Range header requis",
      });
    }

    // Exemple: bytes=0-
    const s3Object = await getObjectFromS3({
      key,
      range,
    });

    const contentRange = s3Object.ContentRange;
    const contentLength = s3Object.ContentLength;
    const contentType = s3Object.ContentType || "video/mp4";

    res.writeHead(206, {
      "Content-Range": contentRange,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": contentType,
    });

    s3Object.Body.pipe(res);
  } catch (error) {
    console.error("streamVideoController error:", error);

    res.status(500).json({
      error: "Erreur streaming",
      details: error.message,
    });
  }
}

export default streamVideoController;