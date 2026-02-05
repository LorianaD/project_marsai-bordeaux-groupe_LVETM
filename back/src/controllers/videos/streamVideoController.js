import fs from "fs";
import path from "path";
import videosModel from "../../models/videos.model.js";

//  Cette fonction sert à savoir OÙ sont stockées les vidéos sur le serveur
function getVideoBaseDir() {
  //  1) Si une variable d’environnement VIDEO_DIR existe, on l’utilise
  // (pratique en prod ou selon les serveurs)
  if (process.env.VIDEO_DIR) return process.env.VIDEO_DIR;

  //  2) Sinon, on utilise le dossier par défaut
  // process.cwd() = racine du projet
  // donc ici : /uploads/videos
  return path.join(process.cwd(), "uploads", "videos");
}

//  Contrôleur pour streamer une vidéo
// Exemple : GET /api/videos/:id/stream
async function streamVideoController(req, res) {
  try {
    //  On récupère l’id de la vidéo depuis l’URL
    const { id } = req.params;

    //  On récupère l’en-tête "Range"
    // C’est ce qui permet au navigateur de demander
    // “donne-moi juste une partie de la vidéo”
    const range = req.headers.range;

    //  On demande au model les infos du fichier vidéo
    // (nom du fichier, statut, etc.)
    const video = await videosModel.findVideoFileById(id);

    //  Si aucune vidéo n’est trouvée en base
    if (!video) {
      return res.status(404).json({ error: "Vidéo introuvable" });
    }

    //  Sécurité :
    // si la vidéo existe mais n’est pas publiée,
    // on refuse l’accès
    if (video.upload_status && video.upload_status !== "Published") {
      return res.status(403).json({ error: "Vidéo non disponible" });
    }

    //  On construit le chemin complet du fichier vidéo sur le serveur
    const videoPath = path.join(getVideoBaseDir(), video.video_file_name);

    let stat;
    try {
      //  On vérifie que le fichier existe vraiment sur le disque
      stat = fs.statSync(videoPath);
    } catch {
      //  Si le fichier n’existe pas (supprimé, déplacé, etc.)
      return res
        .status(404)
        .json({ error: "Fichier vidéo introuvable sur le serveur" });
    }

    //  Taille totale du fichier (en octets)
    const fileSize = stat.size;

    // =====================================================
    // CAS 1 : le navigateur ne demande PAS de range
    // (rare pour les vidéos, mais possible)
    // =====================================================
    if (!range) {
      //  On envoie toute la vidéo d’un coup
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes",
      });

      //  On lit le fichier et on l’envoie au client
      fs.createReadStream(videoPath).pipe(res);
      return;
    }

    // =====================================================
    // CAS 2 : le navigateur demande un RANGE
    // (lecture par morceaux → streaming)
    // =====================================================

    //  Format attendu : "bytes=start-end"
    const match = String(range).match(/bytes=(\d+)-(\d*)/);

    //  Si le format est invalide
    if (!match) {
      return res.status(416).json({ error: "Range invalide" });
    }

    //  Début du morceau demandé
    const start = Number(match[1]);

    //  Fin demandée (peut être vide)
    const requestedEnd = match[2] ? Number(match[2]) : null;

    //  Taille d’un chunk (morceau envoyé)
    // 1MB ici (tu peux monter à 5 ou 10MB)
    const CHUNK_SIZE = 10 ** 6;

    //  On calcule la vraie fin :
    // - soit la fin demandée
    // - soit start + chunk size
    // - sans jamais dépasser la taille du fichier
    const end = Math.min(
      requestedEnd ?? start + CHUNK_SIZE - 1,
      fileSize - 1
    );

    //  Vérification de sécurité :
    // si le range dépasse la taille du fichier
    if (start >= fileSize || end < start) {
      return res
        .status(416)
        .set("Content-Range", `bytes */${fileSize}`)
        .end();
    }

    //  On crée un stream uniquement pour ce morceau
    const stream = fs.createReadStream(videoPath, { start, end });

    // Réponse HTTP spéciale streaming (206 = Partial Content)
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    });

    //  On envoie le morceau au client
    stream.pipe(res);
  } catch (error) {
    //  En cas de bug serveur
    console.error("streamVideoController error:", error);
    res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}

// Export du contrôleur
export default streamVideoController;
