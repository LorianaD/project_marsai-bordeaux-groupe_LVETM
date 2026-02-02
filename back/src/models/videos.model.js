// Je récupère la "pool" MySQL (c’est la connexion à la base de données)
import { pool } from "../db/index.js";

// ======================================================================
//  1) LISTE DES VIDÉOS PUBLIÉES (façade publique)
// ======================================================================
// Cette fonction sert à récupérer la liste des vidéos qu’on a le droit d’afficher
// (donc seulement celles qui sont "Published")
async function findPublishedVideos(filters = {}) {
  // Ici je récupère les filtres éventuels envoyés dans l’URL
  // ex : /api/videos?title=xxx&theme=yyy
  const { title, theme } = filters;

  // Je construis ma requête SQL de base
  // Je sélectionne uniquement les colonnes utiles pour la galerie
  let sql = `
    SELECT
      v.id,
      v.title,              -- utile si ton front utilise title (FR)
      v.title_en,
      v.synopsis,
      v.cover,
      v.duration,
      v.country,
      v.language,
      v.director_name,
      v.director_lastname,
      v.director_country
    FROM videos v
    WHERE v.upload_status = 'Published'
  `;

  // params = les valeurs qu’on va injecter dans la requête SQL
  // Ça évite les injections SQL et c’est plus propre
  const params = [];

  //  Si on a un filtre "title" :
  // on ajoute un AND pour chercher dans title_en
  if (title) {
    sql += " AND v.title_en LIKE ?";
    params.push(`%${title}%`);
  }

  //  Si on a un filtre "theme" :
  // on vérifie que la vidéo a un tag correspondant
  if (theme) {
    sql += `
      AND EXISTS (
        SELECT 1
        FROM film_tag ft
        JOIN tag t ON t.id = ft.tag_id
        WHERE ft.video_id = v.id AND t.name = ?
      )
    `;
    params.push(theme);
  }

  // Je trie par id décroissant pour avoir les plus récentes en premier
  sql += " ORDER BY v.id DESC";

  // J’exécute la requête SQL avec les params
  // pool.execute renvoie un tableau, dont [0] = les lignes
  const [rows] = await pool.execute(sql, params);

  // Je renvoie la liste brute des vidéos
  return rows;
}

// ======================================================================
//  2) DÉTAIL D’UNE VIDÉO (publique)
// ======================================================================
// Cette fonction sert à récupérer une seule vidéo par son id
// et seulement si elle est "Published"
async function findOnePublishedVideoById(id) {
  // Ici je demande toutes les infos nécessaires pour la page détail
  const sql = `
    SELECT
      id,
      title,                 -- utile si tu veux le titre FR
      title_en,
      synopsis,
      synopsis_en,
      video_file_name,
      cover,
      duration,
      country,
      language,
      director_name,
      director_lastname,
      director_country,      -- origine du réalisateur
      ai_tech                -- tech stack / outils IA (pour l’afficher dans VideoDetails)
    FROM videos
    WHERE id = ?
      AND upload_status = 'Published'
  `;

  // Je passe "id" en paramètre pour éviter l’injection SQL
  const [rows] = await pool.execute(sql, [id]);

  // rows[0] = la première ligne (vu qu’on cherche un id unique)
  // si rien trouvé → null
  return rows[0] || null;
}

// ======================================================================
//  3) STREAM : récupérer le fichier vidéo
// ======================================================================
// Cette fonction sert à récupérer le nom du fichier vidéo,
// pour que le controller puisse streamer la vidéo depuis le disque
async function findVideoFileById(id) {
  const sql = `
    SELECT id, video_file_name, upload_status
    FROM videos
    WHERE id = ?
  `;

  const [rows] = await pool.execute(sql, [id]);

  // si la vidéo n’existe pas → null
  return rows[0] || null;
}

// ======================================================================
//  4) CREATE : créer une vidéo (upload)
// ======================================================================
// Cette fonction sert à insérer une nouvelle vidéo dans la base de données.
// Elle est compatible transaction (si on lui passe une connexion "conn").
async function createVideo(payload, connection = pool) {
  // Requête INSERT : on dit exactement quelles colonnes on remplit
  const sql = `
    INSERT INTO videos (
      youtube_video_id,
      video_file_name,
      title,
      title_en,
      synopsis,
      synopsis_en,
      cover,
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
      upload_status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Ici je prépare les valeurs dans le même ordre que les "?" de la requête
  const params = [
    payload.youtube_video_id ?? null,
    payload.video_file_name,
    payload.title,
    payload.title_en,
    payload.synopsis,
    payload.synopsis_en,
    payload.cover,
    payload.language,
    payload.country,
    Number(payload.duration), // je force duration à être un nombre
    payload.tech_resume,
    payload.ai_tech,
    payload.creative_resume,
    payload.email,
    payload.director_name,
    payload.director_lastname,
    payload.director_gender,
    payload.birthday,
    payload.mobile_number ?? null, // optionnel → null si vide
    payload.home_number ?? null,   // optionnel → null si vide
    payload.address,
    payload.director_country,
    payload.discovery_source,
    payload.upload_status ?? "Pending", // par défaut, en attente
  ];

  // Ici j’exécute l’insert avec la "connection"
  // - soit c’est la pool (normal)
  // - soit c’est une connexion de transaction (conn)
  const [result] = await connection.execute(sql, params);

  // insertId = id auto-généré par MySQL
  return result.insertId;
}

// ======================================================================
// Export du "model" :
// ça permet aux controllers d’appeler ces fonctions facilement
export default {
  findPublishedVideos,
  findOnePublishedVideoById,
  findVideoFileById,
  createVideo,
};
