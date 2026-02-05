// models/contact.model.js
import { pool } from "../db/index.js";

export async function createContactMessage({
  name,
  last_name,
  subject,
  email,
  message,
}) {
  const sql = `
    INSERT INTO contact_messages (name, last_name, subject, email, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await pool.execute(sql, [
    name,
    last_name,
    subject,
    email,
    message,
  ]);

  return result.insertId;
}
