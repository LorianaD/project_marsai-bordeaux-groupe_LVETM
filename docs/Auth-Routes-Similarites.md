# Auth & Routes — Similitudes et redondances

Ce document recense les patterns similaires ou redondants liés à l'authentification et à la protection des routes.

---

## 1. RequireAuth et AdminGuard — Redondance

| Fichier | Rôle | Vérification |
|---------|------|---------------|
| `front/src/routes/RequireAuth.jsx` | Protège toutes les routes admin/selector | `decodeToken()` → si pas user → `/login` |
| `front/src/components/admin/AdminGuard.jsx` | Protège les routes `/admin/*` | `decodeToken()` → si pas user → `/login` ; si selector → `/selector/videos` |

**Flux actuel :**
```
RequireAuth (user ? Outlet : /login)
    └── /admin/* → AdminRouter
            └── AdminGuard (!user ? /login ; selector ? /selector/videos ; else children)
                    └── AdminLayout
```

**Redondance :** La vérification `!user → /login` dans AdminGuard est inutile car RequireAuth a déjà redirigé les non connectés. AdminGuard ne voit jamais un utilisateur vide quand on arrive par `/admin/*`.

**Piste :** Supprimer le `!user` dans AdminGuard, ou fusionner RequireAuth et AdminGuard en un seul composant.

---

## 2. Redirection selon le rôle (selector → /selector/videos)

La logique « si selector → /selector/videos, sinon /admin » est dupliquée dans **3 fichiers** :

| Fichier | Contexte |
|---------|----------|
| `AdminGuard.jsx` | Bloque l'accès admin pour les selectors |
| `LoginForm.jsx` | Redirection après connexion réussie |
| `AdminEntryButton.jsx` | Clic sur « Espace administrateur » dans le footer |

**Code répété :**
```javascript
// AdminGuard
if (user?.role === "selector") return <Navigate to="/selector/videos" />;

// LoginForm
const target = user?.role === "selector" ? "/selector/videos" : "/admin";

// AdminEntryButton
if (user.role === "selector") navigate("/selector/videos");
else navigate("/admin");
```

**Piste :** Créer un utilitaire `getDefaultRouteForRole(role)` qui retourne `/selector/videos` ou `/admin`.

---

## 3. decodeToken vs isSelectorFromToken (VideoDetails)

| Fichier | Fonction | Rôle |
|---------|----------|------|
| `front/src/utils/decodeToken.js` | `decodeToken()` | Lit le token, décode le payload, retourne `{ sub, email, role, ... }` |
| `front/src/pages/VideoDetails.jsx` | `isSelectorFromToken()` | Lit le token, décode le payload, vérifie `role === "selector"` |

**isSelectorFromToken** refait le décodage JWT (`JSON.parse(atob(token.split(".")[1]))`) au lieu d'utiliser `decodeToken()`.

**Piste :** Remplacer par :
```javascript
const user = decodeToken();
return user?.role === "selector";
```

---

## 4. getToken vs decodeToken (VideoDetails)

| Fichier | Fonction | Rôle |
|---------|----------|------|
| `front/src/utils/decodeToken.js` | `decodeToken()` | `localStorage.getItem("token")` puis décode |
| `front/src/pages/VideoDetails.jsx` | `getToken()` | Cherche dans plusieurs clés (token, jwt, accessToken, user, etc.) |

**Différence :** `getToken()` est plus tolérant (plusieurs emplacements de stockage). `decodeToken()` ne regarde que `localStorage.token`. Le projet utilise uniquement `localStorage.setItem("token", ...)` au login.

**Piste :** Si on reste sur un seul stockage, `getToken()` pourrait simplement retourner `localStorage.getItem("token")` ou être aligné avec `decodeToken`.

---

## 5. Utilisation de decodeToken dans le projet

| Fichier | Usage |
|---------|-------|
| RequireAuth.jsx | Vérifier si connecté |
| AdminGuard.jsx | Vérifier si connecté + rôle selector |
| LoginForm.jsx | Redirection après login |
| AdminEntryButton.jsx | Redirection au clic |
| AdminVideos.jsx | Afficher BtnLogout si selector |
| DashboardUser.jsx | currentUser pour afficher les actions |
| AdminLayoutSidebar.jsx | currentUser pour l'affichage |
| AdminSidebarModal.jsx | currentUser pour l'affichage |
| AdminHero.jsx | currentUser pour l'affichage |

**Conclusion :** `decodeToken` est bien centralisé. Les doublons concernent surtout la logique de redirection et le décodage manuel dans VideoDetails.

---

## 6. Résumé des actions possibles

| Priorité | Action |
|----------|--------|
| Moyenne | Supprimer la vérification `!user` dans AdminGuard (déjà faite par RequireAuth) |
| Basse | Créer `getDefaultRouteForRole(role)` pour factoriser la redirection |
| Basse | Remplacer `isSelectorFromToken()` par `decodeToken()?.role === "selector"` dans VideoDetails |
| Optionnel | Simplifier ou aligner `getToken()` avec le reste du projet |
