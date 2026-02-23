# Guide débutant : créer une chaîne YouTube + récupérer les infos OAuth (MarsAI)

## ✅ Avant de commencer

Il faut :

* un **compte Google** (Gmail)
* être connecté sur Chrome avec ce compte

---

## 1) Ouvrir / créer une chaîne YouTube

1. Aller sur **YouTube** (site web)
2. Cliquer sur l’icône du profil (en haut à droite)
3. Cliquer sur **Votre chaîne**
4. Si YouTube propose de créer une chaîne :

   * cliquer sur **Créer une chaîne**
   * choisir un nom (ex : MarsAI Festival)
   * valider

✅ La chaîne est créée.

> Astuce : si rien ne s’affiche, aller sur **YouTube Studio** et ça force souvent la création :
>
> * rechercher “YouTube Studio”
> * ouvrir et suivre les étapes

---

## 2) Récupérer le `CLIENT_ID` et `CLIENT_SECRET` (Google Cloud)

⚠️ Ça se fait sur Google Cloud, pas sur YouTube.

1. Aller sur **Google Cloud Console**
2. En haut, choisir le bon projet (ex : *MarsAI-YouTube*)
3. Menu ☰ → **API et services** → **Identifiants**
4. Dans “Clients OAuth 2.0”, cliquer sur le client (ex : *MarsAIYouTubeUpload*)

➡️ Copier :

* **ID client** → à mettre dans `.env` : `YOUTUBE_CLIENT_ID=...`
* **Code secret du client** → à mettre dans `.env` : `YOUTUBE_CLIENT_SECRET=...`

⚠️ Si le secret n’est pas visible :

* cliquer sur **Créer un nouveau code secret**
* copier le nouveau secret
* l’utiliser dans le `.env`

---

## 3) Vérifier l’URL de redirection (Redirect URI)

Toujours sur la même page Google Cloud (le client OAuth) :

Dans **URI de redirection autorisés**, il doit y avoir :

✅ `http://localhost:3001/callback`

(Si ce n’est pas là, l’ajouter puis **Enregistrer**.)

---

## 4) Mettre les infos dans le fichier `.env` (back)

Dans le projet, dossier `back/`, ouvrir le fichier `.env` et remplir :

```env
YOUTUBE_CLIENT_ID=COLLER_ICI
YOUTUBE_CLIENT_SECRET=COLLER_ICI
YOUTUBE_REDIRECT_URI=http://localhost:3001/callback
```

✅ À ce stade, on n’a pas encore le refresh token.

---

## 5) Générer le `YOUTUBE_REFRESH_TOKEN` automatiquement (le plus important)

Toujours dans `back/`, ouvrir un terminal et taper :

```bash
node scripts/get-youtube-token.js
```

Le terminal affiche un message :

> “Ouvre ce lien dans ton navigateur : …”

1. Copier le lien Google affiché
2. Le coller dans le navigateur
3. Se connecter au compte Google
4. Cliquer sur **Autoriser**
5. Après validation, une page s’ouvre :

✅ **Succès !**
et affiche :

`YOUTUBE_REFRESH_TOKEN=...`

---

## 6) Ajouter le refresh token dans `.env`

Copier la ligne complète et la mettre dans `back/.env` :

```env
YOUTUBE_REFRESH_TOKEN=COLLER_ICI
```

📌 Important :

* **sur une seule ligne**
* pas d’espace
* pas de guillemets

---

## 7) Redémarrer le serveur back

Après avoir modifié `.env`, il faut relancer le serveur back :

```bash
npm run dev
```

---

# 🧯 Si ça ne marche pas (solutions faciles)

## ❌ “localhost:3001/callback inaccessible”

➡️ Ça veut dire que le script n’est pas lancé.
✅ Relancer :

```bash
node scripts/get-youtube-token.js
```

## ❌ Pas de refresh token donné par Google

✅ Il faut supprimer l’accès puis recommencer :

1. Aller sur [https://myaccount.google.com/permissions](https://myaccount.google.com/permissions)
2. Supprimer l’autorisation de l’application
3. Relancer le script

---

# Résumé en 1 phrase

✅ YouTube = créer une chaîne
✅ Google Cloud = récupérer ID/secret + redirect URI
✅ Script Node = récupérer refresh token
✅ `.env` = tout stocker