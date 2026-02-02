### Cours : cartographie / traçage du flux de requête HTTP

Thème : **depuis l’URL → `app.js` → routeur principal → sous‑routeur → contrôleur**

Les exemples sont adaptés à ton projet Express actuel.

---

### 1. Vue globale : qui fait quoi ?

Quand tu tapes ou appelles une URL comme :

```text
POST http://localhost:PORT/api/admin/users/register
```

la requête HTTP traverse plusieurs “couches” dans ton backend Express :

1. **Serveur HTTP / Express**  
   - Créé dans `server.js` (`app.listen(PORT, ...)`).
2. **Application Express** (`app`)  
   - Configurée dans `app.js` (middlewares, préfixe `/api`, etc.).
3. **Routeur principal**  
   - Dans `back/src/routes/index.js` (toutes les routes API passent par lui).
4. **Sous‑routeurs**  
   - Par exemple `back/src/routes/users.js` pour les routes `/users/...`.
5. **Contrôleurs**  
   - Fonctions qui contiennent la logique métier, ex. `adminRegister` dans `register.controller.js`.

**Cartographie simplifiée** :

```text
URL → app.js → routes/index.js → routes/users.js → register.controller.js
```

---

### 2. Étape 1 : l’URL arrive jusqu’à Express (`server.js` + `app.js`)

#### 2.1. `server.js` : démarrage du serveur

Dans ton projet :

```js
import app from "./app.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server lancé sur ${PORT}`);
});
```

- `app.listen(PORT, ...)` crée un **serveur HTTP** qui écoute sur `http://localhost:PORT`.
- Toute requête envoyée à `http://localhost:PORT/...` est d’abord reçue par **Express**, qui délègue ensuite à `app` (ton application).

#### 2.2. `app.js` : configuration de l’application Express

Extrait important :

```js
import express from "express";
import router from "./routes/index.js";

const app = express();

// middlewares globaux
app.use(cors());
app.use(express.json());

// route test
app.get("/", (req, res) => {
  res.json({ message: "the site is running" });
});

// routes API
app.use("/api", router);
```

Ici :

- `app.get("/")` répond aux requêtes sur `GET /` (ex. `http://localhost:PORT/`).
- `app.use("/api", router)` dit :
  > “Pour toute requête qui commence par `/api`, envoie la suite de l’URL au **routeur principal** `router`.”

Donc :

- Requête `POST /api/admin/users/register` :
  - passe par Express (serveur),
  - entre dans `app`,
  - matche le préfixe `/api`,
  - est envoyée à `router` (routeur principal).

---

### 3. Étape 2 : routeur principal (`routes/index.js`)

Dans ton fichier :

```js
import { Router } from "express";
import { testController } from "../controllers/test.controller.js";
import usersRouter from "./users.js";

const router = Router();

router.get("/test", testController);
// router.use("/users", usersRouter);  ← à ajouter pour monter les routes users

export default router;
```

Rôle du routeur principal :

- C’est un mini‑`app` spécialisé pour les routes, monté sous `/api`.
- Il décide **vers quel sous‑routeur ou contrôleur** envoyer la requête.

Quand tu écris :

```js
router.use("/users", usersRouter);
```

tu dis :

> “Pour toute requête `/api/users/...`, délègue la suite à `usersRouter`.”

Cartographie à ce niveau :

- `POST /api/test` → `router.get("/test", ...)` (route directe).
- `POST /api/users/admin/register` → `router.use("/users", usersRouter)` → sous‑routeur `usersRouter`.

---

### 4. Étape 3 : sous‑routeur (`routes/users.js`)

Dans ton fichier :

```js
import { Router } from "express";
import registerController from "../controllers/users/register.controller.js";

const router = Router();

// route en post
router.post("/register", registerController);

export default router;
```

Ce sous‑routeur :

- Ne connaît que sa **partie relative** de l’URL : ici `"/register"`.
- S’il est monté avec `router.use("/users", usersRouter);` dans le routeur principal, l’URL complète devient :
  - `/api` (depuis `app.js`)  
  - + `/users` (depuis `router.use`)  
  - + `/register` (depuis `router.post`)  
  - = **`/api/users/admin/register`**

Cartographie :

```text
POST /api/users/admin/register
  → app.js (app.use("/api", router))
  → routes/index.js (router.use("/users", usersRouter))
  → routes/users.js (router.post("/register", registerController))
```

---

### 5. Étape 4 : contrôleur (`register.controller.js`)

Dans ton fichier :

```js
function adminRegister(req, res) {
  console.log("ok pour la route register");
}

export default adminRegister;
```

Rôle du contrôleur :

- C’est la **fonction finale** qui reçoit :
  - les données de la requête (`req.body`, `req.params`, `req.query`, `req.headers`, etc.),
  - l’objet `res` pour envoyer la réponse.
- Il contient la **logique métier** :
  - validation,
  - accès à la base de données,
  - création / mise à jour / suppression,
  - format de la réponse JSON.

Dans ton routeur `users.js` :

```js
router.post("/register", registerController);
```

tu dis :

> “Quand quelqu’un fait un `POST /api/users/admin/register`, appelle la fonction `registerController` (ici `adminRegister`).”

Cartographie complète :

```text
POST /api/users/admin/register
  → app.js                   (préfixe /api)
  → routes/index.js          (préfixe /users)
  → routes/users.js          (route POST /register)
  → register.controller.js   (fonction adminRegister)
```

---

### 6. Comment tracer / déboguer le flux de requête

Pour bien comprendre où ça bloque, tu peux ajouter des `console.log` à chaque niveau :

1. **Dans `app.js`** (juste avant `app.use("/api", router);`) :
   ```js
   app.use("/api", (req, res, next) => {
     console.log("app.js → /api", req.method, req.url);
     next();
   }, router);
   ```

2. **Dans `routes/index.js`** (au début du fichier) :
   ```js
   router.use((req, res, next) => {
     console.log("index.js (routeur principal) →", req.method, req.url);
     next();
   });
   ```

3. **Dans `routes/users.js`** :
   ```js
   router.use((req, res, next) => {
     console.log("users.js (sous-routeur) →", req.method, req.url);
     next();
   });
   ```

4. **Dans `adminRegister`** :
   ```js
   console.log("Contrôleur adminRegister appelé avec body:", req.body);
   ```

Avec ça, tu peux voir **jusqu’où la requête arrive** :

- Si rien ne s’affiche → problème d’URL / port.
- Si log `app.js` seulement → problème dans le routeur principal.
- Si log `index.js` mais pas `users.js` → problème de `router.use("/users", usersRouter)`.
- Si log `users.js` mais pas dans le contrôleur → problème sur la définition de la route (`router.post(...)`).

---

### 7. Exercices pour t’entraîner

1. **Exercice 1**  
   Dessine (sur papier ou dans un fichier) le chemin complet pour :
   - `GET /api/test`
   - `POST /api/users/admin/register`
   en indiquant pour chaque étape :
   - le fichier,
   - le handler ou routeur appelé.

2. **Exercice 2**  
   Ajoute un nouveau sous‑routeur (ex. `adminRouter`) avec une route :
   - `GET /api/admin/ping` → qui renvoie `{ message: "admin ok" }`.
   Traçe le flux comme on l’a fait :
   - URL → `app.js` → `routes/index.js` → `routes/admin.js` → contrôleur.

3. **Exercice 3**  
   Simule une 404 :
   - Appelle une URL qui n’existe pas,
   - Observe quels middlewares / routeurs sont touchés,
   - et à quel moment `notFound` est appelé.

---

### 8. Résumé

- **`app.js`** : l’application Express, monte les middlewares globaux et le préfixe `/api`.
- **Routeur principal (`routes/index.js`)** : point d’entrée de toutes les routes API, distribue vers les sous‑routeurs.
- **Sous‑routeurs (`routes/users.js`, etc.)** : gèrent des groupes de routes avec un préfixe commun (`/users`, `/admin`, ...).
- **Contrôleurs** : fonctions finales qui contiennent la logique métier et construisent la réponse.

Comprendre cette cartographie te permet de :

- savoir **où ajouter une route**,
- savoir **sur quelle URL réelle elle sera exposée**,
- et **où regarder** quand une requête ne se comporte pas comme prévu.

