import videosModel from "../../models/videos.model.js";


async function videosListController(req, res) {
  try {
    const videos = await videosModel.findPublishedVideos(req.query);
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
}

export default videosListController;
