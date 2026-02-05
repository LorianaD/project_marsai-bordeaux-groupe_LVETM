import path from "path";
import stillsModel from "../../models/stills.model.js";
import videosModel from "../../models/videos.model.js";
import subtitlesModel from "../../models/subtitles.model.js";
import { pool } from "../../db/index.js";

// ✅ AJOUT YOUTUBE : service qui uploade sur YouTube via l’API Google
// (le service doit gérer les chemins réels vers les fichiers sur le disque)
import { uploadToYouTube } from "../../services/youtube.service.js";

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

// ✅ AJOUT TAGS : normalise (trim/lowercase) + retire doublons/vides
function normalizeTags(tags = []) {
  return [
    ...new Set(
      tags
        .map((t) => String(t || "").trim().toLowerCase())
        .filter((t) => t.length > 0),
    ),
  ];
}

// ✅ AJOUT TAGS : crée les tags manquants et renvoie toutes les lignes (id + name)
async function upsertTags(cleanTags, conn) {
  if (!cleanTags.length) return [];

  // on fabrique "(?), (?), (?)" selon le nombre de tags
  const values = cleanTags.map(() => "(?)").join(", ");

  // Créer les tags manquants
  // IMPORTANT : ça marche bien si tags.name est UNIQUE
  await conn.query(`INSERT IGNORE INTO tags (name) VALUES ${values}`, cleanTags);

  // Récupérer les id de tous les tags concernés
  const placeholders = cleanTags.map(() => "?").join(", ");
  const [rows] = await conn.query(
    `SELECT id, name FROM tags WHERE name IN (${placeholders})`,
    cleanTags,
  );

  return rows; // [{ id, name }, ...]
}

async function uploadVideoController(req, res) {
  // ✅ DEBUG : ça permet de voir ce que le front envoie vraiment
  console.log("REQ.BODY raw:", req.body);
  console.log(
    "BODY KEYS:",
    Object.keys(req.body || {}).map((k) => JSON.stringify(k)),
  );
  console.log(
    "FILES KEYS:",
    Object.keys(req.files || {}).map((k) => JSON.stringify(k)),
  );

  // ✅ DEBUG ENV : vérifier que les vars YouTube sont bien là côté runtime
  console.log("HAS YT CLIENT ID?", !!process.env.YOUTUBE_CLIENT_ID);
  console.log("HAS YT CLIENT SECRET?", !!process.env.YOUTUBE_CLIENT_SECRET);
  console.log("HAS YT REFRESH TOKEN?", !!process.env.YOUTUBE_REFRESH_TOKEN);
  // (optionnel) si tu utilises un redirect custom
  console.log("YT REDIRECT URI:", process.env.YOUTUBE_REDIRECT_URI);

  //  On ouvre une connexion à la DB
  const conn = await pool.getConnection();

  try {
    //  Ici on récupère les fichiers envoyés par multer
    const videoFile = req.files?.video?.[0];
    const coverFile = req.files?.cover?.[0];
    const stillFiles = req.files?.stills || [];
    const subtitleFiles = req.files?.subtitles || [];

    //  Vérifications “fichiers obligatoires”
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

    // ✅ DEBUG PATHS : vérifier ce que multer a réellement écrit
    console.log("UPLOAD FILES (multer):", {
      video: {
        originalname: videoFile.originalname,
        filename: videoFile.filename,
        path: videoFile.path,
        size: videoFile.size,
        mimetype: videoFile.mimetype,
      },
      cover: {
        originalname: coverFile.originalname,
        filename: coverFile.filename,
        path: coverFile.path,
        size: coverFile.size,
        mimetype: coverFile.mimetype,
      },
      stillsCount: stillFiles.length,
      subtitlesCount: subtitleFiles.length,
    });

    //  Sous-titres : uniquement .srt
    const nonSrt = subtitleFiles.find((f) => !isSrtFile(f));
    if (nonSrt) {
      return res.status(400).json({
        error: "SRT_TYPE_NOT_ALLOWED",
        details: "Seuls les fichiers .srt sont autorisés pour subtitles.",
        file: nonSrt.originalname,
      });
    }

    // ✅ On prépare les sous-titres tout de suite
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

    // ✅ Parse contributors
    let contributorsList = [];
    try {
      const parsed = JSON.parse(contributors || "[]");
      contributorsList = Array.isArray(parsed) ? parsed : [];
    } catch {
      contributorsList = [];
    }

    // ✅ Booleans
    const ownershipCertifiedBool = ownership_certified === "1";
    const promoConsentBool = promo_consent === "1";

    // ✅ Parse tags
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

    const genderRaw = String(director_gender || "").trim().toLowerCase();
    let directorGenderDb = null;

    if (["m", "mr", "male", "homme", "man", "monsieur"].includes(genderRaw)) {
      directorGenderDb = "Mr";
    }
    if (["f", "mrs", "female", "femme", "woman", "madame"].includes(genderRaw)) {
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

    // 1) On crée la vidéo principale
    const videoId = await videosModel.createVideo(payload, conn);

    // ✅✅✅ AJOUT YOUTUBE : upload sur YouTube (non bloquant)
    let youtubeVideoId = null;

    // ✅ DEBUG YOUTUBE PAYLOAD
    console.log("YT UPLOAD PAYLOAD (controller):", {
      videoFile: payload.video_file_name,
      title: payload.title,
      coverFile: payload.cover,
      subtitlesFile: subtitlesPayload[0]?.file_name || null,
      // description peut être longue : on loggue juste la taille
      descriptionLength: String(payload.synopsis || "").length,
    });

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

      console.log("✅ YT UPLOAD OK - youtubeVideoId:", youtubeVideoId);
    } catch (err) {
      // ✅ Logs + précis pour diagnostiquer
      console.warn("⚠️ Upload YouTube échoué :", err?.message);
      console.warn("YouTube error status:", err?.code);
      console.warn("YouTube error data:", err?.response?.data);

      // (optionnel) stocker l'erreur si tu as une colonne
      // await conn.query("UPDATE videos SET youtube_upload_error = ? WHERE id = ?", [
      //   JSON.stringify(err?.response?.data || err?.message || "Unknown error"),
      //   videoId,
      // ]);
    }
    // ✅✅✅ FIN AJOUT YOUTUBE

    // ✅ Ownership / promo
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

    // ✅ Contributors
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

    // ✅ Tags
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

    // 2) Stills
    await stillsModel.insertStills(videoId, stillFiles, conn);

    // 4) Subtitles
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

    console.error("uploadVideoController error:", e);
    return res
      .status(500)
      .json({ error: "Erreur serveur", details: e.message });
  } finally {
    conn.release();
  }
}

export default uploadVideoController;
