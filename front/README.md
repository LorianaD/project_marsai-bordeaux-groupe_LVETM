## Frontend – Programme / Events (plan d’organisation)

### 1. Objectif fonctionnel

- **Programme / Events**
  - Afficher la **liste des événements** (`events`).
  - Afficher le **détail d’un événement** (page dédiée).
- **Couches impliquées**
  - **Back** : Model, Controller, Routes pour `events`.
  - **Front** : Pages `Events` (liste) et `EventDetail` (détail), + composant `EventCard`.

---

### 2. Base de données (MySQL)

- Base : `projet_marsai`
- Table principale pour cette fonctionnalité : **`events`**

Champs importants pour le front :

- `id` (PK, AUTO_INCREMENT)
- `title`
- `description`
- `date`
- `length`
- `stock`
- `illustration`
- `location`
- `created_at`, `updated_at` (techniques)

---

### 3. Backend (Express) – structure prévue

Fichiers à créer côté back :

- `src/models/eventsModel.js`
- `src/controllers/eventsController.js`
- `src/routes/events.js`
- branchement dans `src/routes/index.js`

Responsabilités :

- **Model (`eventsModel.js`)**
  - `findAll()` : récupère tous les events (id, title, date, illustration, location…)
  - `findById(id)` : récupère un event précis par son `id`
- **Controller (`eventsController.js`)**
  - `getEvents(req, res)` : renvoie la liste des events
  - `getEventById(req, res)` : renvoie un event ou 404 si non trouvé
- **Routes (`events.js`)**
  - `GET /api/events` → liste
  - `GET /api/events/:id` → détail
- **Routes globales (`index.js`)**
  - `router.use("/events", eventsRouter);`

---

### 4. Frontend (React + Vite) – pages et composants

Fichiers à créer côté front :

- `src/pages/Events.jsx` : liste des événements
- `src/pages/EventDetail.jsx` : détail d’un événement
- Optionnel : `src/components/EventCard.jsx` pour afficher une carte d’event.

Routing :

- `/events` → `Events.jsx`
- `/events/:id` → `EventDetail.jsx`

Comportement :

- **`Events.jsx`**
  - Au montage : appel à `GET /api/events`
  - Affiche une liste / grille de cartes avec titre, date, lieu, image
  - Chaque carte a un lien vers `/events/{id}`
- **`EventDetail.jsx`**
  - Récupère `id` depuis l’URL
  - Appelle `GET /api/events/:id`
  - Affiche : `title`, `description`, `date`, `length`, `location`, `stock`, `illustration`

---

### 5. Ordre de travail recommandé

1. **Back** – créer `eventsModel`, `eventsController`, routes `events`
2. Tester les endpoints `/api/events` et `/api/events/:id`
3. **Front** – ajouter les routes React `/events` et `/events/:id`
4. Implémenter `Events.jsx` (liste)
5. Implémenter `EventDetail.jsx` (détail)
6. Améliorer le design (cartes, layout, responsive)

---

### 6. Exemples de code (backend) à utiliser plus tard

Model – `src/models/eventsModel.js` :

```js
import { pool } from "../db/index.js";

export async function findAllEvents() {
  const [rows] = await pool.query(
    "SELECT id, title, date, illustration, location FROM events ORDER BY date ASC"
  );
  return rows;
}

export async function findEventById(id) {
  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
  return rows[0] || null;
}
```

Controller – `src/controllers/eventsController.js` :

```js
import { findAllEvents, findEventById } from "../models/eventsModel.js";

export async function getEvents(req, res, next) {
  try {
    const events = await findAllEvents();
    return res.json(events);
  } catch (err) {
    return next(err);
  }
}

export async function getEventById(req, res, next) {
  try {
    const { id } = req.params;
    const event = await findEventById(id);

    if (!event) {
      return res.status(404).json({ error: "Événement non trouvé" });
    }

    return res.json(event);
  } catch (err) {
    return next(err);
  }
}
```

Routes – `src/routes/events.js` :

```js
import express from "express";
import { getEvents, getEventById } from "../controllers/eventsController.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/:id", getEventById);

export default router;
```

Et branchement dans `src/routes/index.js` :

```js
import express from "express";
import eventsRouter from "./events.js";

const router = express.Router();

router.use("/events", eventsRouter);

export default router;
```
