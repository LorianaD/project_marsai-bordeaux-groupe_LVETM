# 📦 Configuration du stockage S3 (Scaleway) — MarsAI

Ce guide explique comment configurer et utiliser Scaleway S3 dans **notre backend Express**.

## ✅ Architecture du projet (MarsAI)

- `src/server.js` : démarre le serveur (listen), lance la cron, test DB
- `src/app.js` : configure Express (CORS, middlewares) + branche `/api`
- `src/routes/index.js` : centralise les routes (`router.use(...)`)

Le flux d’upload est :

```

Front (React)
↓ (POST file)
Backend (Node/Express)
↓ (PutObject)
Scaleway S3

````

⚠️ Les clés Scaleway ne doivent **jamais** être mises dans le front.

---

## 1️⃣ Installer les dépendances (BACK)

Dans le dossier `/back` :

```bash
npm install @aws-sdk/client-s3 multer
````

* `@aws-sdk/client-s3` : client S3 (compatible Scaleway)
* `multer` : réception des fichiers envoyés par le front

---

## 2️⃣ Variables d’environnement (BACK)

Dans `back/.env` :

```env
########################################
# Scaleway S3 Storage
########################################
SCALEWAY_ACCESS_KEY=...
SCALEWAY_SECRET_KEY=...
SCALEWAY_ENDPOINT=https://s3.fr-par.scw.cloud
SCALEWAY_BUCKET_NAME=brdx
SCALEWAY_REGION=fr-par
SCALEWAY_FOLDER=grpX
```

### 🔹 Important

* Remplacer `grpX` par le nom de votre groupe (ex: `grp4`)
* Ne jamais mettre ces clés dans le front (`VITE_...` interdit ici)

---

## 3️⃣ Vérifier le .gitignore

Le `.env` ne doit pas être push.

Dans `/back/.gitignore` (ou `.gitignore` global) :

```gitignore
.env
```

---

## 4️⃣ Créer le client S3 (BACK)

Créer le fichier :

`back/src/config/s3.js`

```js
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.SCALEWAY_REGION,
  endpoint: process.env.SCALEWAY_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SCALEWAY_ACCESS_KEY,
    secretAccessKey: process.env.SCALEWAY_SECRET_KEY,
  },
});

export default s3;
```

---

## 5️⃣ Créer la route d’upload S3 (BACK)

Créer le fichier :

`back/src/routes/uploadS3.routes.js`

```js
import { Router } from "express";
import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";

const router = Router();

// Upload en mémoire (buffer)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier reçu" });
    }

    const file = req.file;

    // Exemple: grp4/1700000000000-image.jpg
    const safeName = file.originalname.replace(/\s+/g, "-");
    const key = `${process.env.SCALEWAY_FOLDER}/${Date.now()}-${safeName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.SCALEWAY_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read", // bucket en lecture publique selon la doc école
    });

    await s3.send(command);

    const url = `${process.env.SCALEWAY_ENDPOINT}/${process.env.SCALEWAY_BUCKET_NAME}/${key}`;

    return res.json({ url, key });
  } catch (err) {
    console.error("S3 upload error:", err);
    return res.status(500).json({ message: "Upload S3 échoué" });
  }
});

export default router;
```

---

## 6️⃣ Brancher la route dans `src/routes/index.js`

⚠️ Chez nous, **on ne touche pas à `server.js`**.

Dans :

`back/src/routes/index.js`

### 6.1 Importer la route

```js
import uploadS3Routes from "./uploadS3.routes.js";
```

### 6.2 Ajouter le `router.use`

Par exemple :

```js
router.use("/upload", uploadS3Routes);
```

✅ Résultat : l’endpoint final devient :

```
POST /api/upload
```

Car `src/app.js` contient déjà :

```js
app.use("/api", router);
```

---

## 7️⃣ Tester l’upload (Postman / Insomnia)

### Requête

* Méthode : `POST`
* URL : `http://localhost:PORT/api/upload`
* Body : `form-data`

  * clé : `file`
  * valeur : (choisir un fichier)

### Réponse attendue

```json
{
  "url": "https://s3.fr-par.scw.cloud/brdx/grp4/1700000000000-image.jpg",
  "key": "grp4/1700000000000-image.jpg"
}
```

---

## 8️⃣ Côté Front (React)

Dans le front, on envoie le fichier au backend :

```js
const uploadToS3 = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");

  const data = await res.json();
  return data.url; // à stocker en DB
};
```

Dans `front/.env` :

```env
VITE_API_URL=http://localhost:3000
```

---

## 🧠 Notes importantes

* Les clés Scaleway restent uniquement dans `back/.env`
* Ne jamais mettre `SCALEWAY_SECRET_KEY` dans le front (pas de `VITE_...`)
* `SCALEWAY_FOLDER` doit être unique par groupe (sinon fichiers mélangés)
* Actuellement `app.js` expose `/uploads` en statique (local).
  Avec S3, on stockera plutôt l’URL S3 en base.

---

## ✅ Checklist finale

* [ ] Les variables S3 sont dans `back/.env`
* [ ] Le `.env` est ignoré par git
* [ ] Aucune clé Scaleway dans `front/.env`
* [ ] `SCALEWAY_FOLDER` correspond à votre groupe
* [ ] La route `POST /api/upload` répond bien avec `{ url, key }`