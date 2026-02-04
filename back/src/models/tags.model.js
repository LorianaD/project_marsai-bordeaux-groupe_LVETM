// Nettoie les tags (trim, lowercase) et enlève les doublons
export function normalizeTags(tags = []) {
  return [
    ...new Set(
      tags
        .map((t) => String(t).trim().toLowerCase())
        .filter((t) => t.length > 0),
    ),
  ];
}

// Crée les tags qui n'existent pas encore et renvoie toutes les lignes (id + name)
export async function upsertTags(cleanTags, conn) {
  if (!cleanTags.length) return [];

  // on fabrique "(?), (?), (?)" selon le nombre de tags
  const values = cleanTags.map(() => "(?)").join(", ");

  // ✅ INSERT IGNORE + UNIQUE(name) => évite les doublons
  await conn.execute(
    `INSERT IGNORE INTO tags (name) VALUES ${values}`,
    cleanTags,
  );

  // ✅ récupérer les ids des tags concernés
  const placeholders = cleanTags.map(() => "?").join(", ");
  const [rows] = await conn.execute(
    `SELECT id, name FROM tags WHERE name IN (${placeholders})`,
    cleanTags,
  );

  return rows; // [{ id, name }, ...]
}
