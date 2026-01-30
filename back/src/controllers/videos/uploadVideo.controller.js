import path from "path";
import stillsModel from "../../models/stills.model.js";
import videosModel from "../../models/videos.model.js";
import subtitlesModel from "../../models/subtitles.model.js";
import { pool } from "../../db/index.js";

//  Petit helper : essayer de deviner la langue d’un sous-titre à partir de son nom
// Exemple: "movie.fr.srt" -> "fr", "sub_en.srt" -> "en"
function normalizeLangFromFilename(filename) {
  const lower = String(filename || "").toLowerCase();

  //  On cherche un code langue “entouré” par des séparateurs (., _, -, etc.)
  // ex: ".fr." "_en_" "-es-" etc.
  const m = lower.match(/[\W_.-](fr|en|es|it|de|pt|ar|nl|ru|zh|ja|ko)[\W_.-]/);

  //  si on trouve, on renvoie "fr"/"en"/etc., sinon null
  return m ? m[1] : null;
}

//  Vérifie si un fichier est bien un .srt
function isSrtFile(file) {
  const ext = path.extname(file?.originalname || "").toLowerCase();
  return ext === ".srt";
}

async function uploadVideoController(req, res) {
  //  DEBUG : ça permet de voir ce que le front envoie vraiment
  // (souvent utile quand on a un bug de FormData / multer)
  console.log("REQ.BODY raw:", req.body);
  console.log(
    "BODY KEYS:",
    Object.keys(req.body || {}).map((k) => JSON.stringify(k)),
  );
  console.log(
    "FILES KEYS:",
    Object.keys(req.files || {}).map((k) => JSON.stringify(k)),
  );

  //  On ouvre une connexion à la DB
  // (et on la garde jusqu’à la fin, surtout pour faire une transaction)
  const conn = await pool.getConnection();

  try {
    //  Ici on récupère les fichiers envoyés par multer
    // req.files contient des tableaux, car multer gère les champs “multi-fichiers”
    const videoFile = req.files?.video?.[0];
    const coverFile = req.files?.cover?.[0];
    const stillFiles = req.files?.stills || [];
    const subtitleFiles = req.files?.subtitles || [];

    //  Vérifications “fichiers obligatoires”
    // Si un truc manque, on répond 400 (c’est une erreur côté client)
    if (!videoFile)
      return res.status(400).json({ error: "Fichier vidéo manquant (video)." });
    if (!coverFile)
      return res.status(400).json({ error: "Image cover manquante (cover)." });
    if (stillFiles.length === 0)
      return res
        .status(400)
        .json({ error: "Au moins 1 still requis (stills)." });
    if (subtitleFiles.length === 0)
      return res
        .status(400)
        .json({ error: "Au moins 1 sous-titre requis (subtitles)." });

    //  Sous-titres : uniquement .srt
    // Si l’utilisateur envoie autre chose -> on refuse
    const nonSrt = subtitleFiles.find((f) => !isSrtFile(f));
    if (nonSrt) {
      return res.status(400).json({
        error: "SRT_TYPE_NOT_ALLOWED",
        details: "Seuls les fichiers .srt sont autorisés pour subtitles.",
        file: nonSrt.originalname,
      });
    }

    //  Ici on récupère tous les champs texte envoyés dans req.body
    // (ce sont les champs de ton formulaire React)
    const {
      youtube_video_id,
      title_en,
      synopsis,
      synopsis_en,
      language,
      country,
      duration,
      tech_resume,
      ai_tech,
      creative_resume,
      email,
      director_name,
      director_lastname,
      director_gender,
      birthday,
      mobile_number,
      home_number,
      address,
      director_country,
      discovery_source,
    } = req.body;

    //  On liste les champs obligatoires
    // Comme ça, on peut facilement dire “il manque quoi”
    const required = {
      title_en,
      synopsis,
      synopsis_en,
      language,
      country,
      duration,
      tech_resume,
      ai_tech,
      creative_resume,
      email,
      director_name,
      director_lastname,
      director_gender,
      birthday,
      address,
      director_country,
      discovery_source,
    };

    //  On fabrique la liste des champs manquants (ou vides)
    const missing = Object.entries(required)
      .filter(
        ([, v]) => v === undefined || v === null || String(v).trim() === "",
      )
      .map(([k]) => k);

    //  S’il manque des champs : 400 + la liste
    if (missing.length) {
      return res.status(400).json({ error: "Champs manquants", missing });
    }

    //  duration doit être un nombre > 0
    // (car depuis le front, c’est souvent une string)
    const durationNum = Number(duration);
    if (!Number.isFinite(durationNum) || durationNum <= 0) {
      return res.status(400).json({
        error: "duration invalide",
        details: "duration doit être un nombre > 0",
        received: duration,
      });
    }

    //  Normalisation de la civilité
    // Ici tu acceptes plein de façons d’écrire “Mr/Mrs”,
    // et tu transformes tout en valeur propre pour la DB
    const genderRaw = String(director_gender || "")
      .trim()
      .toLowerCase();

    let directorGenderDb = null;

    //  si l’utilisateur a écrit une version “homme”
    if (["m", "mr", "male", "homme", "man", "monsieur"].includes(genderRaw)) {
      directorGenderDb = "Mr";
    }

    //  si l’utilisateur a écrit une version “femme”
    if (
      ["f", "mrs", "female", "femme", "woman", "madame"].includes(genderRaw)
    ) {
      directorGenderDb = "Mrs";
    }

    //  si c’est déjà exactement "Mr" ou "Mrs"
    if (director_gender === "Mr" || director_gender === "Mrs") {
      directorGenderDb = director_gender;
    }

    //  si aucune correspondance : on refuse
    if (!directorGenderDb) {
      return res.status(400).json({
        error: "director_gender invalide",
        details:
          "Valeurs acceptées : Mr / Mrs (ou m/f, male/female, homme/femme).",
        received: director_gender,
      });
    }

    //   Payload final : c’est ce qu’on va enregistrer dans la table video
    // - on met les fichiers (noms générés par multer)
    // - on “trim” les strings
    // - on met null pour ce qui est optionnel
    // - et on met upload_status = Pending (en attente)
    const payload = {
      youtube_video_id: youtube_video_id ?? null,
      video_file_name: videoFile.filename,
      cover: coverFile.filename,
      title_en: String(title_en).trim(),
      synopsis: String(synopsis).trim(),
      synopsis_en: String(synopsis_en).trim(),
      language: String(language).trim(),
      country: String(country).trim(),
      duration: durationNum,
      tech_resume: String(tech_resume).trim(),
      ai_tech: String(ai_tech).trim(),
      creative_resume: String(creative_resume).trim(),
      email: String(email).trim(),
      director_name: String(director_name).trim(),
      director_lastname: String(director_lastname).trim(),
      director_gender: directorGenderDb, // ✅ valeur clean : Mr / Mrs
      birthday: String(birthday).trim(),
      mobile_number: mobile_number ?? null,
      home_number: home_number ?? null,
      address: String(address).trim(),
      director_country: String(director_country).trim(),
      discovery_source: String(discovery_source).trim(),
      upload_status: "Pending",
    };

    //  Transaction DB :
    // L’idée : soit TOUT est enregistré, soit RIEN.
    // (sinon tu pourrais avoir une vidéo sans stills, ou des sous-titres sans vidéo)
    await conn.beginTransaction();

    // 1) On crée la vidéo principale et on récupère son id
    const videoId = await videosModel.createVideo(payload, conn);

    // 2) On ajoute les stills liés à ce videoId
    await stillsModel.insertStills(videoId, stillFiles, conn);

    // 3) On prépare les sous-titres :
    // on stocke le nom du fichier + une langue si on arrive à la deviner
    const subtitlesPayload = subtitleFiles.map((f) => ({
      file_name: f.filename,
      language: normalizeLangFromFilename(f.originalname) || null,
    }));

    // 4) On insère les sous-titres en DB
    await subtitlesModel.insertSubtitles(videoId, subtitlesPayload, conn);

    //  Si tout s’est bien passé : on valide la transaction
    await conn.commit();

    //  Réponse succès : 201 (créé) + id de la vidéo créée
    return res.status(201).json({
      message: "Upload OK",
      videoId,
    });
  } catch (e) {
    //  Si un problème arrive :
    // on annule tout ce qu’on avait commencé à écrire en DB
    try {
      await conn.rollback();
    } catch {}

    console.error("uploadVideoController error:", e);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: e.message });
  } finally {
    //  Important : on rend la connexion à la pool, sinon fuite
    conn.release();
  }
}

export default uploadVideoController;
