# 📦 Configuration du stockage S3 (Scaleway)

Ce guide explique comment configurer et utiliser le stockage S3 (Scaleway) dans notre projet.

L’architecture utilisée est :

```
Front (React)
      ↓
Backend (Node / Express)
      ↓
Scaleway S3
```

⚠️ Les clés d’accès ne doivent **jamais** être exposées côté front.

---

# 1️⃣ Préparation

## 📌 1.1 Installer les dépendances (dans le dossier `/back`)

```bash
npm install @aws-sdk/client-s3 multer
```

* `@aws-sdk/client-s3` → communication avec Scaleway (compatible S3)
* `multer` → gestion des fichiers envoyés par le front

---

# 2️⃣ Configuration des variables d’environnement

## 📌 2.1 Fichier `back/.env`

Créer (ou compléter) le fichier :

```
/back/.env
```

Ajouter :

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

* Remplacer `grpX` par le nom de votre groupe (ex : grp4)
* Ne pas modifier les clés
* Ne jamais mettre ces variables dans le front

---

## 📌 2.2 Vérifier le `.gitignore`

Dans `/back/.gitignore` (ou global) :

```
.env
```

Le fichier `.env` ne doit jamais être versionné.

---

# 3️⃣ Création du client S3

Créer :

```
back/src/config/s3.js
```

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

# 4️⃣ Route d’upload

Créer :

```
back/src/routes/upload.js
```

```js
import express from "express";
import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const key = `${process.env.SCALEWAY_FOLDER}/${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.SCALEWAY_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    });

    await s3.send(command);

    const fileUrl = `${process.env.SCALEWAY_ENDPOINT}/${process.env.SCALEWAY_BUCKET_NAME}/${key}`;

    res.json({ url: fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
```

---

# 5️⃣ Ajouter la route au serveur

Dans `server.js` :

```js
import uploadRoute from "./routes/upload.js";

app.use("/api/upload", uploadRoute);
```

---

# 6️⃣ Utilisation côté Front

Dans le front :

```js
const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.url;
};
```

## 📌 Front `.env`

```
VITE_API_URL=http://localhost:3000
```

⚠️ Ne jamais mettre les clés S3 dans le front.

---

# 7️⃣ Résultat attendu

Lorsqu’un fichier est uploadé :

1. Le front envoie le fichier au backend
2. Le backend l’envoie à Scaleway
3. Scaleway retourne une URL publique
4. Cette URL peut être enregistrée en base de données

Exemple d’URL générée :

```
https://s3.fr-par.scw.cloud/brdx/grp4/1700000000000-image.jpg
```

---

# 8️⃣ Bonnes pratiques

* Vérifier le type MIME (image/jpeg, video/mp4…)
* Limiter la taille des fichiers
* Sécuriser la route (auth admin si nécessaire)
* Ne jamais exposer `SCALEWAY_SECRET_KEY`
* Toujours utiliser `SCALEWAY_FOLDER` propre au groupe

---

# ✅ Checklist finale

* [ ] Les variables S3 sont dans `back/.env`
* [ ] Le `.env` est ignoré par git
* [ ] Aucun `VITE_SCALEWAY_SECRET_KEY` dans le front
* [ ] `SCALEWAY_FOLDER` correspond à votre groupe
* [ ] Le serveur redémarre sans erreur