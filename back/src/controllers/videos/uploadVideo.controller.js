import path from "path";
import stillsModel from "../../models/stills.model.js";
import videosModel from "../../models/videos.model.js";
import subtitlesModel from "../../models/subtitles.model.js";
import { pool } from "../../db/index.js";
import { uploadToYouTube } from "../../services/youtube.service.js";

// Déduit un code langue depuis le nom du fichier
function normalizeLangFromFilename(filename) {
  const lower = String(filename || "").toLowerCase();
  const m = lower.match(/[\W_.-](fr|en|es|it|de|pt|ar|nl|ru|zh|ja|ko)[\W_.-]/);
  return m ? m[1] : null;
}

// Vérifie si le fichier est un .srt
function isSrtFile(file) {
  const ext = path.extname(file?.originalname || "").toLowerCase();
  return ext === ".srt";
}

// Normalise les tags et retire doublons
function normalizeTags(tags = []) {
  return [
    ...new Set(
      tags
        .map((t) =>
          String(t || "")
            .trim()
            .toLowerCase(),
        )
        .filter((t) => t.length > 0),
    ),
  ];
}

// Crée les tags manquants et retourne leurs ids
async function upsertTags(cleanTags, conn) {
  if (!cleanTags.length) return [];

  const values = cleanTags.map(() => "(?)").join(", ");
  await conn.query(
    `INSERT IGNORE INTO tags (name) VALUES ${values}`,
    cleanTags,
  );

  const placeholders = cleanTags.map(() => "?").join(", ");
  const [rows] = await conn.query(
    `SELECT id, name FROM tags WHERE name IN (${placeholders})`,
    cleanTags,
  );

  return rows;
}

// Upload complet et écriture DB dans une transaction
async function uploadVideoController(req, res) {
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

    const nonSrt = subtitleFiles.find((f) => !isSrtFile(f));
    if (nonSrt) {
      return res.status(400).json({
        error: "SRT_TYPE_NOT_ALLOWED",
        details: "Seuls les fichiers .srt sont autorisés pour subtitles.",
        file: nonSrt.originalname,
      });
    }

    const subtitlesPayload = subtitleFiles.map((f) => ({
      file_name: f.filename,
      language: normalizeLangFromFilename(f.originalname) || null,
    }));

    const {
      youtube_video_id,
      title,
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
      contributors,
      ownership_certified,
      promo_consent,
      tags,
    } = req.body;

    let contributorsList = [];
    try {
      const parsed = JSON.parse(contributors || "[]");
      contributorsList = Array.isArray(parsed) ? parsed : [];
    } catch {
      contributorsList = [];
    }

    const ownershipCertifiedBool = ownership_certified === "1";
    const promoConsentBool = promo_consent === "1";

    let tagsList = [];
    try {
      const parsedTags = JSON.parse(tags || "[]");
      tagsList = Array.isArray(parsedTags) ? parsedTags : [];
    } catch {
      tagsList = [];
    }

    const required = {
      title,
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

    const toNullIfEmpty = (v) => {
      if (v === undefined || v === null) return null;
      const s = String(v).trim();
      return s === "" ? null : s;
    };

    const payload = {
      youtube_video_id: toNullIfEmpty(youtube_video_id),

      video_file_name: videoFile.filename,
      cover: coverFile.filename,

      title: String(title).trim(),
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
      director_gender: directorGenderDb,
      birthday: String(birthday).trim(),

      mobile_number: toNullIfEmpty(mobile_number),
      home_number: toNullIfEmpty(home_number),

      address: String(address).trim(),
      director_country: String(director_country).trim(),
      discovery_source: String(discovery_source).trim(),

      upload_status: "Pending",
    };

    await conn.beginTransaction();

    const videoId = await videosModel.createVideo(payload, conn);

    let youtubeVideoId = null;
    try {
      youtubeVideoId = await uploadToYouTube({
        videoFile: payload.video_file_name,
        title: payload.title,
        description: payload.synopsis,
        coverFile: payload.cover,
        subtitlesFile: subtitlesPayload[0]?.file_name || null,
      });

      await conn.query("UPDATE videos SET youtube_video_id = ? WHERE id = ?", [
        youtubeVideoId,
        videoId,
      ]);
    } catch (err) {}

    await conn.query(
      `
      UPDATE videos
      SET
        ownership_certified = ?,
        ownership_certified_at = ?,
        promo_consent = ?,
        promo_consent_at = ?
      WHERE id = ?
      `,
      [
        ownershipCertifiedBool ? 1 : 0,
        ownershipCertifiedBool ? new Date() : null,
        promoConsentBool ? 1 : 0,
        promoConsentBool ? new Date() : null,
        videoId,
      ],
    );

    for (const c of contributorsList) {
      const fullNameRaw = String(c?.full_name || "").trim();
      const profession = String(c?.profession || "").trim();
      const cEmail = String(c?.email || "").trim();
      const cGender = c?.gender === "Mrs" ? "Mrs" : "Mr";

      if (!fullNameRaw || !profession || !cEmail) continue;

      const parts = fullNameRaw.split(/\s+/);
      const firstName = parts.shift();
      const lastName = parts.join(" ") || null;

      await conn.query(
        `
        INSERT INTO contributor
          (video_id, name, last_name, gender, email, profession)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [videoId, firstName, lastName, cGender, cEmail, profession],
      );
    }

    const cleanTags = normalizeTags(tagsList);

    if (cleanTags.length > 0) {
      const tagRows = await upsertTags(cleanTags, conn);

      if (tagRows.length > 0) {
        const values = tagRows.map(() => "(?, ?)").join(", ");
        const params = tagRows.flatMap((t) => [videoId, t.id]);

        await conn.query(
          `INSERT IGNORE INTO video_tag (video_id, tag_id) VALUES ${values}`,
          params,
        );
      }
    }

    await stillsModel.insertStills(videoId, stillFiles, conn);

    await subtitlesModel.insertSubtitles(videoId, subtitlesPayload, conn);

    await conn.commit();

    return res.status(201).json({
      message: "Upload OK",
      videoId,
      youtube_video_id: youtubeVideoId,
      tags: cleanTags,
    });
  } catch (e) {
    try {
      await conn.rollback();
    } catch {}

    return res
      .status(500)
      .json({ error: "Erreur serveur", details: e.message });
  } finally {
    conn.release();
  }
}

export default uploadVideoController;
