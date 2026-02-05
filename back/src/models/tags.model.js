// Normalise les tags et retire doublons
export function normalizeTags(tags = []) {
  return [
    ...new Set(
      tags
        .map((t) => String(t).trim().toLowerCase())
        .filter((t) => t.length > 0),
    ),
  ];
}

// Crée les tags manquants et retourne leurs ids
export async function upsertTags(cleanTags, conn) {
  if (!cleanTags.length) return [];

  const values = cleanTags.map(() => "(?)").join(", ");

  await conn.execute(
    `INSERT IGNORE INTO tags (name) VALUES ${values}`,
    cleanTags,
  );

  const placeholders = cleanTags.map(() => "?").join(", ");
  const [rows] = await conn.execute(
    `SELECT id, name FROM tags WHERE name IN (${placeholders})`,
    cleanTags,
  );

  return rows;
}
