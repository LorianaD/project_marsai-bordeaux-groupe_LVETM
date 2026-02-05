### Plan de tâches : flux d’enregistrement d’un admin

Ce document liste **ce que TU dois faire**, étape par étape, pour terminer le flux d’enregistrement d’un admin, du front jusqu’à la base de données.

---

### 1. Côté FRONTEND (React / Vite)

#### 1.1. Créer un service d’API pour l’enregistrement

- **Fichier concerné** : `front/src/services/Auth/RegisterApi.js`
- **Objectif** : y définir une fonction (par ex. `registerAdmin`) qui :
  - prend en paramètres : `email`, `firstName`, `lastName`, `password`,
  - fait un `fetch` (ou Axios) vers l’URL de ton backend :
    - `POST http://localhost:PORT_BACK/api/users/admin/register`
    - avec `Content-Type: application/json`
    - et un `body` JSON contenant ces champs.
  - retourne la réponse (succès ou erreur) au composant React.

En pratique :  
1. Importer `fetch` (tu l’as déjà dans le navigateur, pas besoin d’import).  
2. Exporter une fonction qui encapsule l’appel API.  

> **Important** : n’envoie PAS `verifyPassword` au backend, c’est uniquement pour la validation côté front.

#### 1.2. Utiliser ce service dans `RegisterForm.jsx`

- **Fichier concerné** : `front/src/components/admin/RegisterForm.jsx`

Objectif dans `handleSubmit` :

1. Garder toutes tes validations actuelles (champs requis, longueurs, regex, confirmation).
2. **Après** toutes les validations réussies :
   - rendre `handleSubmit` asynchrone (`async`),
   - appeler ta fonction d’API (par ex. `registerAdmin(...)`),
   - gérer :
     - le cas **succès** → `setSuccess("Compte admin créé avec succès");`, éventuellement reset des champs,
     - le cas **erreur** → `setError("Message d’erreur approprié ou renvoyé par l’API");`.

En résumé :  
> Aujourd’hui, ton formulaire ne fait qu’un `console.log`.  
> Tu dois remplacer cette partie par un **appel réel** à ton backend via le service `RegisterApi.js`.

#### 1.3. (Optionnel mais recommandé) Centraliser l’URL du backend

- Créer une constante (par ex. `API_BASE_URL`) dans un fichier de config ou via `import.meta.env.VITE_API_URL`.
- L’utiliser dans `RegisterApi.js` pour éviter de répéter `http://localhost:PORT_BACK` partout.

---

### 2. Côté BACKEND (Express / MySQL)

#### 2.1. Créer la logique métier dans un service d’enregistrement

- **Fichier concerné** : `back/src/services/users/register.service.js`

Objectif : ce fichier doit contenir **la vraie logique d’enregistrement** :

1. Recevoir les données du contrôleur (`email`, `firstName`, `lastName`, `password`).
2. Valider côté backend (même si tu as déjà validé côté front).
3. Hasher le mot de passe :
   - Utiliser `bcrypt` (ou autre) dans `back/src/utils/password.js` :
     - fonction pour `hashPassword`,
     - éventuellement fonction pour `comparePassword`.
4. Insérer l’admin en base :
   - Utiliser le `pool` MySQL de `back/src/db/index.js`,
   - Faire un `INSERT INTO users (...) VALUES (...)` (ou le nom réel de ta table).
5. Retourner au contrôleur :
   - soit l’admin créé (sans le mot de passe),
   - soit une erreur (ex : email déjà utilisé).

> Pour l’instant, ce fichier est **vide** : tu dois y écrire toute cette logique.

#### 2.2. Corriger le contrôleur `adminRegister`

- **Fichier concerné** : `back/src/controllers/users/register.controller.js`

Objectif : ce contrôleur ne doit plus jamais faire référence à `RegisterForm` (composant React), mais seulement à ton **service backend**.

1. Importer la fonction de service depuis `register.service.js`.
2. Dans `adminRegister(req, res, next)` :
   - récupérer `email`, `firstName`, `lastName`, `password` depuis `req.body`,
   - appeler la fonction de service avec ces données,
   - renvoyer une réponse JSON avec :
     - un **status 201** en cas de succès (par ex. `{ success: true, user: ... }`),
     - un **status adapté** en cas d’erreur (400, 409, 500…), avec un message clair.
3. En cas d’erreur, passer l’erreur à `next(error)` pour être gérée par le middleware d’erreur.

> Aujourd’hui, ton contrôleur essaie d’appeler `RegisterForm(req.body)`, ce qui est une erreur de conception.  
> Tu dois le remplacer par un appel à ton **service d’enregistrement**.

#### 2.3. Compléter les utilitaires de sécurité (mot de passe, JWT)

- **Fichiers concernés** :
  - `back/src/utils/password.js`
  - `back/src/utils/jwt.js`

Objectifs :

1. **password.js** :
   - Créer une fonction pour hasher un mot de passe (`hashPassword`),
   - Créer une fonction pour comparer un mot de passe en clair avec le hash (`comparePassword`).
2. **jwt.js** (facultatif pour l’instant, mais utile plus tard) :
   - Fonctions pour générer et vérifier des tokens JWT (`signToken`, `verifyToken`) à partir de `env.jwt.secret`.

Pour le flux d’enregistrement pur, le minimum vital est : **hasher le mot de passe** avant de l’enregistrer en base.

---

### 3. Corrections techniques à prévoir (backend)

#### 3.1. Corriger le middleware d’erreur dans `app.js`

- **Fichier** : `back/src/app.js`
- Aujourd’hui, tu as :
  ```js
  app.use((err, res) => {
    console.error(err);
    return res.status(500).json({
      error: "Erreur serveur",
      details: err.message
    });
  });
  ```
- Problème : la **signature** est incorrecte, il manque `req` et `next`.
- Tu devras le réécrire avec la signature standard :
  ```js
  (err, req, res, next) => { ... }
  ```

> Ce n’est pas bloquant pour l’instant si tu ne l’utilises pas intensément, mais c’est une **mauvaise base** à corriger.

#### 3.2. Harmoniser les modules (`multer.js`)

- **Fichier** : `back/src/config/multer.js`
- Le projet est en ES modules (`"type": "module"`), mais ce fichier utilise `module.exports`.
- Tu devras le réécrire avec des `export` ES modules pour éviter les incohérences.

---

### 4. Tests à effectuer

#### 4.1. Tester l’API seule (Postman / Thunder Client)

1. Lancer le backend (`npm run dev` dans `back`).
2. Envoyer une requête **POST** vers :
   - `http://localhost:PORT_BACK/api/users/admin/register`
3. Body JSON :
   ```json
   {
     "email": "admin@example.com",
     "firstName": "Admin",
     "lastName": "User",
     "password": "MotDePasseTrèsSecurisé!1"
   }
   ```
4. Vérifier :
   - que tu reçois un `201` avec une réponse JSON correcte,
   - que l’utilisateur est bien inséré en base (via phpMyAdmin, par exemple).

#### 4.2. Tester le flux complet via le formulaire

1. Lancer le frontend (`npm run dev` dans `front`) et le backend.  
2. Aller sur `http://localhost:5173/admin/register`.  
3. Remplir le formulaire avec des données valides.  
4. Soumettre :
   - vérifier qu’un appel `POST` part bien vers `/api/users/admin/register` (onglet Network du navigateur),
   - vérifier :
     - que les messages `error` / `success` s’affichent comme prévu,
     - que les données arrivent bien dans `req.body`,
     - que l’enregistrement DB se fait correctement.

---

### 5. Ordre recommandé des tâches

1. **Backend** :
   1. Implémenter `register.service.js` (logique d’enregistrement + DB).
   2. Compléter `password.js` (hash de mot de passe).
   3. Corriger `register.controller.js` pour appeler le service.
2. **Frontend** :
   1. Implémenter `RegisterApi.js`.
   2. Appeler ce service dans `RegisterForm.jsx` (dans `handleSubmit`).
3. **Technique** :
   1. Corriger le middleware d’erreur dans `app.js`.
   2. Harmoniser `multer.js` avec les ES modules.
4. **Tests** :
   1. Tester l’API seule (Postman).
   2. Tester le flux complet via le formulaire React.

Ce plan te donne la **liste exacte** des choses à faire, dans un ordre logique, sans écrire le code à ta place.

