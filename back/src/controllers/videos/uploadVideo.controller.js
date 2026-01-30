import path from "path";
import stillsModel from "../../models/stills.model.js";
import videosModel from "../../models/videos.model.js";
import subtitlesModel from "../../models/subtitles.model.js";
import { pool } from "../../db/index.js";

function normalizeLangFromFilename(filename) {
  const lower = String(filename || "").toLowerCase();
  const m = lower.match(/[\W_.-](fr|en|es|it|de|pt|ar|nl|ru|zh|ja|ko)[\W_.-]/);
  return m ? m[1] : null;
}

function isSrtFile(file) {
  const ext = path.extname(file?.originalname || "").toLowerCase();
  return ext === ".srt";
}

async function uploadVideoController(req, res) {
  // DEBUG (tu peux retirer après)
  console.log("REQ.BODY raw:", req.body);
  console.log(
    "BODY KEYS:",
    Object.keys(req.body || {}).map((k) => JSON.stringify(k)),
  );
  console.log(
    "FILES KEYS:",
    Object.keys(req.files || {}).map((k) => JSON.stringify(k)),
  );

  const conn = await pool.getConnection();

  try {
    const videoFile = req.files?.video?.[0];
    const coverFile = req.files?.cover?.[0];
    const stillFiles = req.files?.stills || [];
    const subtitleFiles = req.files?.subtitles || [];

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

    // Sous-titres : uniquement .srt
    const nonSrt = subtitleFiles.find((f) => !isSrtFile(f));
    if (nonSrt) {
      return res.status(400).json({
        error: "SRT_TYPE_NOT_ALLOWED",
        details: "Seuls les fichiers .srt sont autorisés pour subtitles.",
        file: nonSrt.originalname,
      });
    }

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

    const missing = Object.entries(required)
      .filter(
        ([, v]) => v === undefined || v === null || String(v).trim() === "",
      )
      .map(([k]) => k);

    if (missing.length) {
      return res.status(400).json({ error: "Champs manquants", missing });
    }

    // duration en nombre
    const durationNum = Number(duration);
    if (!Number.isFinite(durationNum) || durationNum <= 0) {
      return res.status(400).json({
        error: "duration invalide",
        details: "duration doit être un nombre > 0",
        received: duration,
      });
    }

    
    const genderRaw = String(director_gender || "")
      .trim()
      .toLowerCase();

    let directorGenderDb = null;

    
    if (["m", "mr", "male", "homme", "man", "monsieur"].includes(genderRaw)) {
      directorGenderDb = "Mr";
    }

    
    if (
      ["f", "mrs", "female", "femme", "woman", "madame"].includes(genderRaw)
    ) {
      directorGenderDb = "Mrs";
    }

    
    if (director_gender === "Mr" || director_gender === "Mrs") {
      directorGenderDb = director_gender;
    }

    if (!directorGenderDb) {
      return res.status(400).json({
        error: "director_gender invalide",
        details:
          "Valeurs acceptées : Mr / Mrs (ou m/f, male/female, homme/femme).",
        received: director_gender,
      });
    }

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
      director_gender: directorGenderDb, // ✅ Mr / Mrs
      birthday: String(birthday).trim(),
      mobile_number: mobile_number ?? null,
      home_number: home_number ?? null,
      address: String(address).trim(),
      director_country: String(director_country).trim(),
      discovery_source: String(discovery_source).trim(),
      upload_status: "Pending",
    };

    await conn.beginTransaction();

    const videoId = await videosModel.createVideo(payload, conn);

    await stillsModel.insertStills(videoId, stillFiles, conn);

    const subtitlesPayload = subtitleFiles.map((f) => ({
      file_name: f.filename,
      language: normalizeLangFromFilename(f.originalname) || null,
    }));

    await subtitlesModel.insertSubtitles(videoId, subtitlesPayload, conn);

    await conn.commit();

    return res.status(201).json({
      message: "Upload OK",
      videoId,
    });
  } catch (e) {
    try {
      await conn.rollback();
    } catch {}

    console.error("uploadVideoController error:", e);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: e.message });
  } finally {
    conn.release();
  }
}

export default uploadVideoController;
