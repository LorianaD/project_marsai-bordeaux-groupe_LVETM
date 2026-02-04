// Associe des tags à une vidéo via la table pivot video_tag
export async function insertVideoTags(videoId, tagRows, conn) {
  if (!tagRows?.length) return;

  const values = tagRows.map(() => "(?, ?)").join(", ");
  const params = tagRows.flatMap((t) => [videoId, t.id]);

  //  INSERT IGNORE => si un lien existe déjà, pas d'erreur
  await conn.execute(
    `INSERT IGNORE INTO video_tag (video_id, tag_id) VALUES ${values}`,
    params,
  );
}
