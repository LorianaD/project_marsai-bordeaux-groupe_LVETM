# 📦 Augmenter la limite de données MySQL avec Laragon

Ce guide explique comment augmenter la taille maximale des données acceptées par MySQL dans **Laragon** (Windows).

Cela peut être nécessaire si vous rencontrez des erreurs comme :

* `Got a packet bigger than 'max_allowed_packet'`
* Import SQL trop volumineux
* JSON trop lourd
* Image Base64 trop grande

---

# 🛠 Étape 1 — Ouvrir le fichier de configuration MySQL

1. Ouvrir l’explorateur Windows
2. Aller dans :

```
C:\laragon\bin\mysql\
```

3. Ouvrir le dossier correspondant à votre version (exemple) :

```
mysql-8.4.3-winx64
```

4. Ouvrir le fichier :

```
my
```

(Type : Paramètres de configuration)

---

# 🧩 Étape 2 — Modifier `max_allowed_packet`

1. Ouvrir le fichier `my` avec le Bloc-notes
2. Rechercher la section :

```ini
[mysqld]
```

3. Ajouter ou modifier cette ligne juste en dessous :

```ini
max_allowed_packet=128M
```

Si la ligne existe déjà, remplacer la valeur.

---

# 🔄 Étape 3 — Redémarrer Laragon

⚠️ Cette étape est obligatoire.

1. Ouvrir Laragon
2. Cliquer sur **Stop All**
3. Cliquer sur **Start All**

---

# ✅ Vérifier que la modification fonctionne

Dans HeidiSQL ou phpMyAdmin, exécuter :

```sql
SHOW VARIABLES LIKE 'max_allowed_packet';
```

Si la valeur affichée est :

```
134217728
```

Cela correspond à **128M** (configuration correcte).

---

# 📌 Quand faut-il modifier cette valeur ?

Modifier `max_allowed_packet` si vous rencontrez :

* Erreur lors d’un import SQL volumineux
* Envoi de JSON important via API
* Upload d’image stockée en base64
* Erreur “Packet too large”

---

# 💡 Valeurs recommandées

| Usage                    | Valeur recommandée |
| ------------------------ | ------------------ |
| Projet classique         | 64M                |
| Projet avec CMS / Images | 128M               |
| Très gros imports        | 256M               |

---

# 🚨 Important

Ne jamais modifier ce fichier en production sans validation.

---

Si vous rencontrez encore une erreur après modification, vérifier :

* Que Laragon a bien été redémarré
* Que vous avez modifié la bonne version de MySQL
* Que le serveur MySQL utilisé est bien celui de Laragon

---

✨ Fin du guide ✨
