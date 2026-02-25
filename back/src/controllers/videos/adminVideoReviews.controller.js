import videoReviewModel from "../../models/videoReview.model.js";

export default async function adminVideoReviewsController(req, res) {
  try {
    const videoId = Number(req.params.id);
    if (!videoId) return res.status(400).json({ error: "ID invalide" });

    const [summary, reviews] = await Promise.all([
      videoReviewModel.findReviewsSummaryByVideoId(videoId),
      videoReviewModel.findReviewsByVideoId(videoId),
    ]);

    return res.status(200).json({ video_id: videoId, summary, reviews });
  } catch (error) {
    console.error("adminVideoReviewsController error:", error);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: error.message });
  }
}
