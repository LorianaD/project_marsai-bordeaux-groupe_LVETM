# Présentation : Authentification, gestion des rôles et sécurisation des routes

## Résumé — Ce qui a été mis en place

J'ai mis en place un système d'authentification complet avec trois rôles (superadmin, admin, selector) et une double protection des accès :

1. **Côté frontend** : Les composants `RequireAuth` et `AdminGuard` empêchent l'accès aux pages admin/selector sans connexion, et redirigent les selectors vers leur espace dédié (`/selector/videos`) s'ils tentent d'accéder à l'admin.

2. **Côté backend** : Les middlewares Express (`verifyToken`, `isAdmin`, `isSelector`, `isSuperAdmin`) protègent les routes API. Chaque endpoint vérifie le token JWT et le rôle avant d'autoriser la requête.

3. **Pourquoi les deux** : Le frontend évite d'afficher des pages inaccessibles (UX). Le backend garantit la sécurité réelle des données (un appel API direct sans token ou avec un mauvais rôle est rejeté).

4. **Fichiers clés** :
   - `front/src/routes/RequireAuth.jsx` — garde des routes protégées
   - `front/src/components/admin/AdminGuard.jsx` — restriction admin vs selector
   - `front/src/utils/decodeToken.js` — lecture du JWT côté client
   - `back/src/utils/isAdmin.js` — middlewares de vérification des rôles

---

## 1. Authentification

### Connexion (login)

- **Endpoint** : `POST /api/users/login`
- **Données** : email + mot de passe
- **Réponse** : JWT contenant `sub`, `email`, `role`, `name`, `last_name`
- **Stockage** : token dans `localStorage`
- **Redirection** selon le rôle :
  - **selector** → `/selector/videos`
  - **admin** / **superadmin** → `/admin/overview`

### Flux côté client

1. Formulaire de connexion (`LoginForm.jsx`)
2. Appel API via `loginUser()` (`LoginApi.js`)
3. Stockage du token
4. Décodage du rôle avec `decodeToken()` pour choisir la redirection

### Utilitaires frontend

- **decodeToken()** : lit le JWT dans `localStorage` et retourne le payload
- **getAuthHeaders()** : ajoute `Authorization: Bearer <token>` aux requêtes API

---

## 2. Gestion des rôles

Trois rôles sont utilisés :

| Rôle | Accès | Création |
|------|-------|----------|
| **superadmin** | Tout l’espace admin + création de tous les rôles | Par un superadmin existant |
| **admin** | Espace admin (sauf certaines actions réservées au superadmin) | Par un superadmin |
| **selector** | Uniquement la gestion des films (`/selector/videos`) | Par un admin ou superadmin |

---

## 3. Sécurisation des routes frontend

### RequireAuth

- **Rôle** : bloquer l’accès aux pages admin/selector sans connexion
- **Emplacement** : autour des routes `/admin/*` et `/selector/*`
- **Comportement** : si pas de token → redirection vers `/login`

### AdminGuard

- **Rôle** : restreindre l’accès aux routes `/admin/*` selon le rôle
- **Comportement** :
  - Pas de token → redirection vers `/login`
  - Rôle **selector** → redirection vers `/selector/videos`
  - Rôles **admin** et **superadmin** → accès autorisé

### Schéma des protections

```
/login (public)
    ↓ connexion OK
RequireAuth vérifie le token
    ↓ token valide
/admin/*  →  AdminGuard  →  admin/superadmin uniquement
/selector/videos  →  selector uniquement (pas de sidebar admin)
```

---

## 4. Middlewares backend (Express)

### verifyToken

- Vérifie la présence de `Authorization: Bearer <token>`
- Valide le JWT avec la clé secrète
- Normalise le rôle et l’ID utilisateur dans `req.user`
- En cas d’erreur : `401` (token manquant ou invalide)

### isAdmin

- À placer **après** `verifyToken`
- Autorise : **admin** et **superadmin**
- Sinon : `403` (accès non autorisé)

### isSuperAdmin

- À placer **après** `verifyToken`
- Autorise : **superadmin** uniquement
- Sinon : `403`

### isSelector

- À placer **après** `verifyToken`
- Autorise : **selector** (et variante `selectionneur`)
- Sinon : `403`

---

## 5. Exemples d’utilisation des middlewares

### Routes utilisateurs (`/api/users`)

| Route | Middlewares | Rôle requis |
|-------|-------------|-------------|
| `GET /` | verifyToken, isAdmin | admin, superadmin |
| `POST /superAdmin/register` | verifyToken, isSuperAdmin | superadmin |
| `POST /admin/register` | verifyToken, isSuperAdmin | superadmin |
| `POST /selector/register` | verifyToken, isAdmin | admin, superadmin |
| `PUT /:id/role` | verifyToken, isSuperAdmin | superadmin |
| `DELETE /:id` | verifyToken, isSuperAdmin | superadmin |
| `POST /login` | — | public |

### Routes vidéos (`/api/videos`)

| Route | Middlewares | Rôle requis |
|-------|-------------|-------------|
| `GET /:id/review/me` | verifyToken, isSelector | selector |
| `PUT /:id/review` | verifyToken, isSelector | selector |

---

## 6. Synthèse

- **Authentification** : JWT après login, stocké côté client
- **Rôles** : superadmin > admin > selector
- **Frontend** : `RequireAuth` + `AdminGuard` pour protéger les routes
- **Backend** : chaîne `verifyToken` + `isAdmin` / `isSuperAdmin` / `isSelector` selon l’endpoint
- **Double protection** : frontend (UX) et backend (sécurité réelle)
