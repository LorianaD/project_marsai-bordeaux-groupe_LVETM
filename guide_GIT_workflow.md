# 🧠 Guide Git simple (pour travailler en équipe)

Ce guide explique **les commandes Git essentielles** pour travailler sur un projet partagé (GitHub).
Objectif : savoir **sauvegarder son code**, **récupérer le code des autres**, et **éviter les conflits**.

---

## ✅ 0) Règles d’or (à lire avant tout)

* **Toujours faire un `git pull` avant de coder** (sinon tu codes sur une version “ancienne”).
* **Commit souvent**, avec des messages clairs.
* **Ne jamais coder directement sur `main`** (si possible). On travaille sur une branche.
* Si tu vois des messages avec `<<<<<<` dans un fichier → c’est un **conflit Git** à résoudre.

---

## 🧩 1) Les commandes indispensables (résumé)

| Action                              | Commande                        |
| ----------------------------------- | ------------------------------- |
| Voir l’état des fichiers            | `git status`                    |
| Ajouter les fichiers au commit      | `git add .`                     |
| Créer un commit (sauvegarde locale) | `git commit -m "message"`       |
| Envoyer sur GitHub                  | `git push`                      |
| Récupérer le code de GitHub         | `git pull`                      |
| Récupérer proprement (recommandé)   | `git pull --rebase origin main` |

---

## 🚀 2) Workflow simple (le plus utilisé)

### ✅ A) Je commence ma session (avant de coder)

Toujours se mettre à jour :

```bash
git pull --rebase origin main
```

👉 Pourquoi `--rebase` ?
Parce que ça **évite de créer des “merge commits”** inutiles et limite les conflits.

---

### ✅ B) Je code… puis je sauvegarde sur GitHub

Quand tu veux envoyer ton travail :

```bash
git add .
git commit -m "feat: update header"
git push
```

📌 À retenir :

* `git add .` = je sélectionne les fichiers à sauvegarder
* `git commit` = je crée une sauvegarde locale
* `git push` = j’envoie la sauvegarde sur GitHub

---

### ✅ C) Je continue à coder et je veux re-mettre à jour GitHub

Tu répètes exactement la même logique :

```bash
git add .
git commit -m "fix: responsive navbar"
git push
```

---

## 🔁 3) Quand utiliser `git pull` ?

### ✅ Cas 1 — Avant de coder

Toujours faire :

```bash
git pull --rebase origin main
```

### ✅ Cas 2 — Avant de push

Si tu as codé longtemps, et que quelqu’un d’autre a push entre temps :

```bash
git pull --rebase origin main
git push
```

---

## 🧠 4) Les messages de commit (important)

Un bon commit explique **ce qui a changé**, pas “update”.

✅ Exemples :

* `feat: add admin sidebar`
* `fix: login redirect`
* `style: improve hero spacing`
* `refactor: clean cms hook`
* `docs: update README setup`

---

## 🌿 5) Workflow recommandé en équipe (avec branches)

⚠️ Si votre projet utilise des Pull Requests (PR), il faut travailler sur une branche.

### ✅ A) Créer une branche

```bash
git checkout -b feat/header-cms
```

### ✅ B) Push la branche sur GitHub

```bash
git push -u origin feat/header-cms
```

Ensuite sur GitHub :

* tu crées une **Pull Request**
* quelqu’un valide
* ça merge dans `main`

---

## 🧯 6) Si Git refuse le push (“rejected”)

Ça arrive quand GitHub a des commits que tu n’as pas encore.

✅ Solution simple :

```bash
git pull --rebase origin main
git push
```

---

## 🧨 7) Si tu as un conflit (merge conflict)

Signes d’un conflit :

* Git affiche un message “CONFLICT”
* Tu vois dans un fichier :

```txt
<<<<<<< HEAD
...
=======
...
>>>>>>> main
```

✅ Étapes :

1. Ouvrir le fichier
2. Choisir la bonne version (ou mélanger les deux)
3. Supprimer les marqueurs `<<<<<<<`, `=======`, `>>>>>>>`
4. Puis :

```bash
git add .
git rebase --continue
```

Si tu veux abandonner le rebase :

```bash
git rebase --abort
```

---

## 🧪 8) Les commandes utiles quand tu es perdu(e)

### Voir l’historique des commits

```bash
git log --oneline --max-count=10
```

### Voir les différences avant commit

```bash
git diff
```

### Voir sur quelle branche tu es

```bash
git branch
```

---

## ✅ Checklist rapide (à suivre à chaque fois)

### Avant de coder

* [ ] `git pull --rebase origin main`

### Avant d’envoyer sur GitHub

* [ ] `git status`
* [ ] `git add .`
* [ ] `git commit -m "message clair"`
* [ ] `git push`

