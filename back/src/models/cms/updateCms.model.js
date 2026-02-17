import { pool } from "../../db/index.js";

/** Type pour un nouveau bloc (INSERT). Par défaut "text", "image" pour les fichiers. */
const DEFAULT_TYPE = "text";

async function updateCms({ page, section, locale, content_key, value, order_index, is_active, type = DEFAULT_TYPE }) {
    const safeValue = value === undefined ? null : value;
    const order = order_index ?? 0;
    const active = is_active ?? 1;

    // Upsert : insère si le bloc n'existe pas, sinon met à jour (débloque l'upload hero media)
    const query = `
        INSERT INTO cms (page, section, content_key, locale, type, value, order_index, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            value = COALESCE(VALUES(value), value),
            order_index = VALUES(order_index),
            is_active = VALUES(is_active),
            updated_at = NOW()
    `;
    const params = [page, section, content_key, locale, type, safeValue, order, active];

    const [result] = await pool.execute(query, params);
    return result;
}

export default updateCms;