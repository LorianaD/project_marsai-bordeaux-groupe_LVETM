import { pool } from "../db/index.js";

export const insertEvent = async (data) => {
  const [result] = await pool.execute(
    `INSERT INTO events (title, description, date, length, stock, illustration, location)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.title,
      data.description ?? null,
      data.date,
      data.length ?? 0,
      data.stock ?? null,
      data.illustration ?? "",
      data.location ?? null,
    ]
  );
  return { id: result.insertId, ...data };
};

// Récupérer tous les events (pour liste / admin)
export const findAllEvents = async () => {
  const [rows] = await pool.execute(
    "SELECT id, title, description, date, length, stock, illustration, location FROM events ORDER BY date ASC"
  );
  return rows;
};

//modifier un event

export const updateEvent = async (id, data) => {
  const dateForDb = (data.date && data.date.length <= 10)
    ? `${data.date} 00:00:00`
    : (data.date || null);

  await pool.execute(
    `UPDATE events SET
      title = ?, description = ?, date = ?, length = ?, stock = ?,
      illustration = ?, location = ?
     WHERE id = ?`,
    [
      data.title,
      data.description ?? null,
      dateForDb,
      data.length ?? 0,
      data.stock ?? null,
      data.illustration ?? "",
      data.location ?? null,
      id,
    ]
  );

  const updated = await findEventById(id);
  return updated || { id: Number(id), ...data };
};

// Récupérer un event par son id (pour page détail / admin)
export const findEventById = async (id) => {
  const [rows] = await pool.execute("SELECT * FROM events WHERE id = ?", [id]);
  return rows[0] || null;
};

//supprimer un event
export const deleteEventById = async (id) => {
  const [result] = await pool.execute("DELETE FROM events WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

//mettre le statut publichs 
export const updateEventPublished = async (id, published) => {
  const value = published ? 1 : 0;
  await pool.execute( "UPDATE events SET published = ? WHERE id = ?", [value, id]);
  const updated = await findEventById(id);
  return updated || { id: Number(id), published };
};

// Liste page publique : uniquement les événements publiés
export const findAllPublishedEvents = async () => {
  const [rows] = await pool.execute(
    "SELECT id, title, description, date, length, stock, illustration, location FROM events WHERE published = 1 ORDER BY date ASC"
  );
  return rows;
};

// Liste page publique avec nombre de réservations (pour afficher les places restantes)
export const findAllPublishedEventsWithRegistered = async () => {
  const [rows] = await pool.execute(
    `SELECT e.id, e.title, e.description, e.date, e.length, e.stock, e.illustration, e.location,
      (SELECT COUNT(*) FROM bookings b WHERE b.event_id = e.id) AS registered
     FROM events e
     WHERE e.published = 1
     ORDER BY e.date ASC`
  );
  return rows;
};

// liste admin tous les events avec nmbr de réserve
export const findAllEventsForAdmin = async () => {
  const [rows] = await pool.execute(
    `SELECT e.id, e.title, e.description, e.date, e.length, e.stock, e.illustration, e.location, e.published,
      (SELECT COUNT(*) FROM bookings b WHERE b.event_id = e.id) AS registered
     FROM events e
     ORDER BY e.date ASC`
  );
  return rows;
};

