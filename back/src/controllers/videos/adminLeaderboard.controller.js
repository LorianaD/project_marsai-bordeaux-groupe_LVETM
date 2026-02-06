import videosModel from "../../models/videos.model.js";

async function adminLeaderboardController(req, res) {
  try {
    const videos = await videosModel.findLeaderboardVideos();
    return res.status(200).json({ videos });
  } catch (error) {
    console.error("adminLeaderboardController error:", error);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: error.message });
  }
}

export default adminLeaderboardController;
