# Présentation — Auth & Users (MarsAI)

Vue d'ensemble des fichiers liés à l'authentification et à la gestion des utilisateurs, avec explications.

---

## Architecture globale

Le système suit une architecture **Controller → Service → Model** côté backend, et **Page/Component → Service API** côté frontend.

```
Frontend                    Backend
────────                    ───────
LoginForm ──► LoginApi ──►  login.controller ──► login.service ──► JWT
DashboardUser ──► Users.api ──► getAllUsers.controller ──► getAllUsers.service ──► get.all.users.model
```

---

## Backend

### 1. Controllers (`back/src/controllers/users/`)

Les controllers reçoivent la requête HTTP, extraient les données (params, body), appellent le service, et renvoient la réponse JSON.

| Fichier | Rôle | Explication |
|---------|------|-------------|
| `login.controller.js` | Connexion | Récupère email/password du body, appelle `login()`, retourne `{ success, token }`. Pas de middleware auth (route publique). |
| `register.controller.js` | Création user | Factory qui crée un controller par rôle. Appelle `register(data, role)`. Protégé par verifyToken + isSuperAdmin ou isAdmin selon le rôle créé. |
| `getAllUsers.controller.js` | Liste users | Appelle le service, retourne `{ success, users }`. Réservé aux admins. |
| `updateUserRole.controller.js` | Changement de rôle | Extrait `id` (params) et `role` (body), appelle le service. Réservé aux superadmins. |
| `deleteUser.controller.js` | Suppression | Extrait `id`, appelle le service. Réservé aux superadmins. |

### 2. Models (`back/src/models/users/`)

Les models exécutent les requêtes SQL. Pas de logique métier, uniquement l'accès aux données.

| Fichier | Rôle | Explication |
|---------|------|-------------|
| `delete.user.model.js` | Suppression | `DELETE FROM users WHERE id = ?`. Retourne le résultat de l'exécution. |
| `get.all.users.model.js` | Lecture | `SELECT id, email, name, last_name, role, created_at FROM users`. Retourne les lignes. |
| `update.user.role.model.js` | Mise à jour rôle | `UPDATE users SET role = ? WHERE id = ?`. Retourne le résultat. |

### 3. Services (`back/src/services/users/`)

Les services contiennent la logique métier : validation, vérifications de sécurité, appel aux models.

| Fichier | Rôle | Explication |
|---------|------|-------------|
| `login.service.js` | Connexion | Vérifie que l'user existe, compare le mot de passe (bcrypt), génère un JWT avec `{ sub, email, role, name, last_name }`. |
| `register.service.js` | Inscription | Hash le mot de passe, insère l'utilisateur en base avec le rôle fourni. |
| `getAllUsers.service.js` | Liste | Appelle le model, retourne la liste des users (sans le hash du mot de passe). |
| `updateUserRole.service.js` | Changement rôle | Vérifie que l'id existe, que le rôle est valide (admin/selector), qu'on ne modifie pas un superadmin, appelle le model. |
| `deleteUser.service.js` | Suppression | Vérifie que l'id existe, qu'on ne supprime pas un superadmin, appelle le model. |
| `forgotPassword.service.js` | Mot de passe oublié | Gère la demande de réinitialisation (envoi email, token temporaire, etc.). |

### 4. Routes (`back/src/routes/users.js`)

Les routes définissent les URLs et enchaînent les middlewares (auth) puis les controllers.

| Méthode | Route | Middlewares | Explication |
|---------|-------|-------------|-------------|
| GET | `/` | verifyToken, isAdmin | Liste des users. Token requis, rôle admin ou superadmin. |
| POST | `/login` | — | Connexion. Route publique. |
| POST | `/superAdmin/register` | verifyToken, isSuperAdmin | Créer un superadmin. Seul un superadmin peut le faire. |
| POST | `/admin/register` | verifyToken, isSuperAdmin | Créer un admin. |
| POST | `/selector/register` | verifyToken, isAdmin | Créer un selector. Un admin ou superadmin peut le faire. |
| PUT | `/:id/role` | verifyToken, isSuperAdmin | Modifier le rôle d'un user. |
| DELETE | `/:id` | verifyToken, isSuperAdmin | Supprimer un user. |

### 5. Utils (`back/src/utils/isAdmin.js`)

Middlewares de sécurité pour protéger les routes selon le rôle.

| Fonction | Rôle | Explication |
|----------|------|-------------|
| `verifyToken` | Vérification JWT | Lit le header `Authorization: Bearer <token>`, décode le JWT, met `req.user = { id, role }`. Retourne 401 si token manquant ou invalide. |
| `isAdmin` | Rôle admin | Autorise `admin` et `superadmin`. 403 sinon. |
| `isSuperAdmin` | Rôle superadmin | Autorise uniquement `superadmin`. 403 sinon. |
| `isSelector` | Rôle selector | Autorise `selector`. 403 sinon. |
| `isAdminOrSelector` | Admin ou selector | Autorise admin, superadmin, selector. Utilisé pour les routes vidéos (liste, statut, featured). |

---

## Frontend

### 1. Components Admin (`front/src/components/admin/`)

| Fichier | Rôle | Explication |
|---------|------|-------------|
| `AdminGuard.jsx` | Garde admin | Enveloppe les routes `/admin/*`. Si pas de user → redirection `/login`. Si rôle selector → redirection `/selector/videos`. Sinon affiche les children (AdminLayout). |
| `AdminLayoutSidebar.jsx` | Sidebar | Menu latéral de l'espace admin. **Partie travaillée : lignes 25 à 42.** |
| `AdminSelect.jsx` | Select custom | Menu déroulant stylé (le select natif ne permet pas de styler les options). Utilise un portail pour éviter d'être coupé par overflow-hidden. **À faire : code plus simple pour junior, commentaires au format =====** |
| `DashboardUser.jsx` | Gestion users | Affiche la liste des users, filtre par rôle, permet de changer le rôle (superadmin) ou supprimer (superadmin). Utilise `getUsers`, `updateUserRole`, `deleteUser` de Users.api. |
| `RegisterForm.jsx` | Formulaire inscription | Formulaire pour créer un admin ou selector. Appelle RegisterApi. |
| `LoginForm.jsx` | Formulaire connexion | Formulaire de connexion. Appelle LoginApi, stocke le token, redirige selon le rôle. **Attention : plusieurs collaborateurs ont travaillé dessus, conflits de commit possibles.** |

### 2. Pages Admin (`front/src/pages/Admin/`)

| Fichier | Rôle | Explication |
|---------|------|-------------|
| `AdminRegister.jsx` | Page inscription | Page qui affiche RegisterForm. Accessible via `/register`. |

### 3. Services API (`front/src/services/`)

| Fichier | Rôle | Explication |
|---------|------|-------------|
| `Admin/Users.api.js` | API users | `getUsers()`, `updateUserRole(id, role)`, `deleteUser(id)`. Utilise `getAuthHeaders()` pour envoyer le token Bearer. |
| `Auth/LoginApi.js` | API login | `loginUser(email, password)`. POST vers `/api/users/login`. Pas de token (connexion). |
| `Auth/RegisterApi.js` | API register | `registerUser(data, role)`. POST vers `/api/users/{role}/register`. Utilise `getAuthHeaders()` car réservé aux admins connectés. |

---

## Flux de connexion (détaillé)

1. L'utilisateur remplit email et mot de passe dans `LoginForm`.
2. Au submit, `loginUser(email, password)` appelle `POST /api/users/login`.
3. Le backend (`login.service`) vérifie les identifiants, génère un JWT avec le rôle.
4. Le frontend stocke le token : `localStorage.setItem("token", result.token)`.
5. `decodeToken()` lit le payload du JWT pour obtenir le rôle.
6. Redirection : si `role === "selector"` → `/selector/videos`, sinon → `/admin`.

---

## Protection des routes (frontend)

- **RequireAuth** : Vérifie la présence d'un token (via `decodeToken()`). Si absent → redirection `/login`. Enveloppe `/admin/*` et `/selector/videos`.
- **AdminGuard** : À l'intérieur de `/admin/*`, bloque les selectors et les redirige vers `/selector/videos`. Les admins et superadmins accèdent au layout admin.

---

## Rôles et permissions

| Rôle | Accès backend | Accès frontend |
|------|---------------|----------------|
| **superadmin** | Tout (users, register, delete, update role) | `/admin/*` |
| **admin** | Liste users, créer selector | `/admin/*` |
| **selector** | Liste vidéos, modifier statut/featured, reviews | `/selector/videos` uniquement |
