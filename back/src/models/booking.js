import { pool } from "../db/index.js";

/**
 * Insère une réservation pour un événement.
 * @param {Object} data - { event_id, first_name, last_name, email }
 * @returns {Promise<{ id, event_id, first_name, last_name, email, created_at }>}
 */
export const insertBooking = async (data) => {
  const [result] = await pool.execute(
    `INSERT INTO bookings (event_id, first_name, last_name, email)
     VALUES (?, ?, ?, ?)`,
    [
      data.event_id,
      data.first_name,
      data.last_name,
      data.email,
    ]
  );
  return {
    id: result.insertId,
    event_id: data.event_id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    created_at: new Date(),
  };
};

/**
 * Compte le nombre de réservations pour un événement (pour vérifier les places).
 */
export const countBookingsByEventId = async (eventId) => {
  const [rows] = await pool.execute(
    "SELECT COUNT(*) AS total FROM bookings WHERE event_id = ?",
    [eventId]
  );
  return rows[0].total;
};

/**
 * Liste des réservations pour un événement (admin).
 * @returns {Promise<Array<{ id, event_id, first_name, last_name, email, created_at }>>}
 */
export const findBookingsByEventId = async (eventId) => {
  const [rows] = await pool.execute(
    `SELECT id, event_id, first_name, last_name, email, created_at
     FROM bookings WHERE event_id = ? ORDER BY created_at DESC`,
    [eventId]
  );
  return rows;
};