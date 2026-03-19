# Routes par rôle — SuperAdmin, Admin, Selector

## Frontend (React)

### Redirection après login
| Rôle | Redirection |
|------|-------------|
| selector | `/selector/videos` |
| admin | `/admin/overview` |
| superadmin | `/admin/overview` |

---

### Routes publiques (sans auth)
| Route | Description |
|-------|-------------|
| `/` | Accueil |
| `/login` | Connexion |
| `/register` | Inscription (admin) |
| `/gallery` | Galerie |
| `/gallery/feed/:id` | Feed vidéo |
| `/gallery/:id` | Détail vidéo |
| `/participation` | Participation / upload |
| `/learnMore` | En savoir plus |
| `/events` | Événements |
| `/events/:id` | Détail événement |
| `/jury` | Jury |
| `/faq` | FAQ |
| `/contact` | Contact |
| `/legal` | Mentions légales |
| `/privacy` | Confidentialité |
| `/terms` | CGU |
| `/partner` | Partenaires |
| `/newsletter/confirm` | Confirmation newsletter |
| `/newsletter/unsubscribe` | Désinscription newsletter |

---

### Routes Admin (admin + superadmin uniquement)
*Protégées par `AdminGuard` — selectors redirigés vers `/selector/videos`*

| Route | Page |
|-------|------|
| `/admin` | Vue d'ensemble |
| `/admin/overview` | Vue d'ensemble |
| `/admin/users` | Gestion des utilisateurs |
| `/admin/videos` | Gestion films |
| `/admin/events` | Événements |
| `/admin/events/:eventId/participants` | Participants événement |
| `/admin/conference-program` | Programme de conférence |
| `/admin/distribution-jury` | Distribution & Jury |
| `/admin/leaderboard` | Résultats & classement |
| `/admin/messages` | Messages |
| `/admin/newsletter` | Newsletter — Abonnés |
| `/admin/newsletters` | Newsletters — Builder |
| `/admin/newsletters/new` | Nouvelle newsletter |
| `/admin/newsletters/:id` | Éditeur newsletter |
| `/admin/settings` | Configuration |

---

### Routes Selector
| Route | Page |
|-------|------|
| `/selector/videos` | Gestion films (même page que admin/videos) |

---

## Backend API (Express)

### Users (`/api/users`)

| Méthode | Route | Rôle requis |
|---------|-------|-------------|
| POST | `/login` | Public |
| GET | `/` | admin, superadmin |
| POST | `/superAdmin/register` | superadmin |
| POST | `/admin/register` | superadmin |
| POST | `/selector/register` | admin, superadmin |
| PUT | `/:id/role` | superadmin |
| DELETE | `/:id` | superadmin |

### Videos (`/api/videos`)

| Méthode | Route | Rôle requis |
|---------|-------|-------------|
| GET | `/admin` | — |
| GET | `/admin/leaderboard` | — |
| GET | `/admin/:id` | — |
| PATCH | `/admin/:id/status` | — |
| PATCH | `/admin/:id/featured` | — |
| GET | `/:id/review/me` | selector |
| PUT | `/:id/review` | selector |

---

## Récapitulatif des rôles

| Rôle | Accès frontend | Accès API |
|------|----------------|-----------|
| **superadmin** | Toutes les routes admin | Users (tout), Videos admin |
| **admin** | Toutes les routes admin | Users (sauf superadmin register, role, delete), Videos admin |
| **selector** | `/selector/videos` uniquement | Videos review (GET/PUT) |