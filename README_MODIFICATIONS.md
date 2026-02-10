# Synthèse des modifications – Événements & Réservations

Ce document décrit **toutes les modifications** faites sur la partie **événements** et **réservations** du projet Mars AI (festival). Il est rédigé pour être compris facilement, avec des mots simples, afin que tu puisses tout expliquer (oral, rapport, ou revue de code).

---

## Sommaire

1. [Contexte du projet](#1-contexte-du-projet)
2. [Vocabulaire utilisé](#2-vocabulaire-utilisé)
3. [Modification 1 : Date et « jour » dans l’admin](#3-modification-1--date-et-jour-dans-ladmin)
4. [Modification 2 : Onglets de jour dynamiques](#4-modification-2--onglets-de-jour-dynamiques)
5. [Modification 3 : Places restantes sur la page publique](#5-modification-3--places-restantes-sur-la-page-publique)
6. [Récapitulatif des fichiers modifiés](#6-récapitulatif-des-fichiers-modifiés)
7. [Comment tester](#7-comment-tester)

---

## 1. Contexte du projet

- **Front** : site du festival (React), avec une **page Événements** (liste des ateliers, réservation) et une **page Admin** pour gérer les événements.
- **Back** : API (Node.js) qui stocke les événements et les réservations en base de données.
- On a travaillé sur :
  - l’**admin des événements** (création, édition, filtrage par jour, pas de champ « Journée » dans le formulaire),
  - les **onglets par jour** qui s’adaptent aux dates des événements,
  - l’affichage des **places restantes** sur la page publique quand des gens réservent.

---

## 2. Vocabulaire utilisé

| Mot / expression | Signification simple |
|------------------|------------------------|
| **Event / Événement** | Un atelier, une conférence, etc. (titre, date, lieu, nombre de places). |
| **Date** | Date + heure de l’événement (ex. 16 octobre 2026 à 14h). C’est ce que l’utilisateur choisit dans le formulaire. |
| **Jour (day)** | Un « jour » au format `YYYY-MM-DD` (ex. `2026-10-16`). Utilisé pour **filtrer** les événements par onglet (Vendredi 16, Samedi 17, etc.). |
| **Onglet (tab)** | Un bouton en haut de la page admin qui filtre la liste (ex. « Vendredi 13 », « Samedi 14 »). |
| **Capacité / stock** | Nombre **total** de places pour l’événement (ex. 30). |
| **Réservation / registered** | Nombre de personnes qui ont déjà réservé. |
| **Places restantes** | Capacité − Réservations (ex. 30 − 5 = 25 places restantes). |
| **Normaliser** | Mettre les données dans un format commun (ex. ajouter un champ `day` à partir de la date). |
| **API** | Le « serveur » (back) qui renvoie ou reçoit des données (événements, réservations). |

---

## 3. Modification 1 : Date et « jour » dans l’admin

### Problème avant

- Dans le formulaire de création/édition d’un événement, il y avait un champ **« Journée »** (liste : Vendredi / Samedi).
- L’utilisateur devait choisir **à la fois** la date/heure **et** la journée.
- Si on changeait les dates du festival plus tard (ex. 3 jours au lieu de 2), il aurait fallu modifier le code partout.

### Objectif

- **Une seule source** : la **date** (date + heure) saisie dans le formulaire.
- Le **jour** (pour les onglets) est **toujours calculé** à partir de cette date. Plus de liste « Vendredi / Samedi » dans le formulaire.

### Ce qui a été fait

#### 1) Fichier `front/src/pages/Admin/AdminEvents.utils.js`

- **Nouvelle fonction `getDayKeyFromDate(isoDate)`**
  - **Rôle** : à partir d’une date (ex. `2026-10-16 14:00:00`), elle retourne le « jour » au format `YYYY-MM-DD` (ex. `2026-10-16`).
  - **Utilité** : partout où on a besoin du « jour » pour filtrer ou afficher un onglet, on utilise cette fonction au lieu de stocker un champ « journée » à part.
  - Si la date est vide ou invalide, la fonction retourne `null`.

- **Modification de `DAY_TABS`**
  - Avant : les onglets avaient des clés en texte (`"vendredi"`, `"samedi"`).
  - Après : les clés sont des **dates** (`"2026-06-13"`, `"2026-06-14"`). Comme ça, le même format sert partout (date = jour).

#### 2) Fichier `front/src/pages/Admin/AdminEvents.jsx`

- **State `day`**  
  - Il contient la clé de l’onglet sélectionné (ex. `"2026-06-13"`).  
  - Il est initialisé avec le premier onglet : `DAY_TABS[0]?.key ?? "2026-06-13"`.

- **Chargement des événements (useEffect)**  
  - Pour chaque événement reçu de l’API, on calcule `dayKey = getDayKeyFromDate(ev.date)`.
  - On met sur l’événement : `day: ev.day ?? dayKey`. Donc le « jour » vient toujours de la date si le back ne l’envoie pas.

- **Formulaire (state `form`)**  
  - Le champ **`day`** a été **retiré** du formulaire (plus de propriété `day` dans `form`).

- **Ouverture du modal (création et édition)**  
  - Dans `openCreate` et `openEdit`, on ne met plus `day` dans `setForm`. Le formulaire ne gère que titre, description, date/heure, capacité, lieu, type.

- **Bloc « Journée » dans le modal**  
  - Le bloc avec le label « Journée » et la liste déroulante (Vendredi / Samedi) a été **supprimé**.

- **Sauvegarde (onSave)**  
  - **Création** : après `createEvent(apiPayload)`, on calcule `createdDay = getDayKeyFromDate(created.date)` et on ajoute l’événement en local avec `day: createdDay`.
  - **Édition** : après `updateEvent(...)`, on calcule `updatedDay = getDayKeyFromDate(updated.date)` et on met à jour l’événement en local avec `day: updatedDay`.

En résumé : **tout part de la date** ; le « jour » est dérivé automatiquement, ce qui simplifie le formulaire et permet de changer les jours du festival plus tard sans tout casser.

---

## 4. Modification 2 : Onglets de jour dynamiques

### Problème avant

- Les onglets en haut de la page admin étaient **fixes** : toujours « Vendredi 13 » et « Samedi 14 » (dates de juin 2026).
- Si tu créais un événement le **16 octobre 2026**, son « jour » était `2026-10-16`, mais il n’y avait **aucun onglet** pour ce jour. L’événement n’apparaissait donc dans aucun filtre.

### Objectif

- Les onglets doivent **s’adapter aux événements** : un onglet par jour qui a au moins un événement.
- Les libellés doivent être en français et lisibles (ex. « Vendredi 16 octobre 2026 »).

### Ce qui a été fait

#### 1) Fichier `front/src/pages/Admin/AdminEvents.utils.js`

- **Nouvelle fonction `formatDayLabel(dayKey)`**
  - **Entrée** : une clé jour `YYYY-MM-DD` (ex. `"2026-10-16"`).
  - **Sortie** : un libellé en français (ex. « Vendredi 16 octobre 2026 »).  
  - Utilisation de `toLocaleDateString("fr-FR", { weekday, day, month, year })` puis mise en majuscule de la première lettre.

- **Nouvelle fonction `getDayTabsFromEvents(events)`**
  - **Rôle** : à partir de la liste des événements, elle construit la liste des onglets à afficher.
  - **Étapes** :
    1. Récupérer tous les `day` différents parmi les événements (sans doublon).
    2. Trier ces jours (ordre chronologique).
    3. Pour chaque jour, créer un objet `{ key: "YYYY-MM-DD", label: "Vendredi 16 octobre 2026" }` en utilisant `formatDayLabel`.
  - **Cas particulier** : s’il n’y a **aucun** événement (ou liste vide), on retourne les onglets par défaut `DAY_TABS` (Vendredi 13 / Samedi 14) pour que la page reste utilisable.

#### 2) Fichier `front/src/pages/Admin/AdminEvents.jsx`

- **Variable `dayTabs`**  
  - Calculée avec `useMemo` : `getDayTabsFromEvents(events)`.  
  - Dès que la liste `events` change (après chargement, création, édition, suppression), les onglets se mettent à jour.

- **Affichage des boutons d’onglets**  
  - On n’utilise plus `DAY_TABS` pour afficher les boutons, mais **`dayTabs`**.  
  - Donc les boutons affichés correspondent aux jours qui ont vraiment des événements (ou aux jours par défaut si aucun événement).

- **Après création d’un événement**  
  - Juste après avoir ajouté le nouvel événement dans le state, on fait `setDay(createdDay)`.  
  - Comme ça, l’interface bascule sur l’onglet du jour du nouvel événement et l’utilisateur le voit tout de suite.

- **Synchronisation de l’onglet sélectionné**  
  - Un `useEffect` vérifie : si l’onglet actuellement sélectionné (`day`) n’existe plus dans `dayTabs` (par exemple plus d’événements ce jour-là), on passe automatiquement au premier onglet de `dayTabs`.  
  - Évite d’avoir un onglet « fantôme » sélectionné avec une liste vide.

En résumé : **les onglets = les jours qui existent dans tes événements**, avec des libellés en français. Créer un événement le 16 octobre crée l’onglet « Vendredi 16 octobre 2026 » et affiche l’événement dedans.

---

## 5. Modification 3 : Places restantes sur la page publique

### Problème avant

- Sur la **page Événements** (côté public), chaque atelier affichait un texte du type « X places restantes ».
- En réalité, on affichait le champ **`stock`** de l’API, qui correspond à la **capacité totale** (nombre de places max), pas au nombre de places **restantes** après réservations.
- Donc même quand des gens réservaient, le nombre ne bougeait pas (toujours 30 par exemple).

### Objectif

- Afficher le **vrai** nombre de places restantes : **capacité − nombre de réservations**.
- Que ce nombre se mette à jour quand on recharge la liste (par exemple après une réservation dans le modal).

### Ce qui a été fait

#### 1) Backend – `back/src/models/event.js`

- **Nouvelle fonction `findAllPublishedEventsWithRegistered()`**
  - Elle fait à peu près la même chose que `findAllPublishedEvents()` (liste des événements **publiés**), mais en ajoutant pour chaque événement le **nombre de réservations**.
  - En SQL : on garde la requête sur les événements publiés, et on ajoute une sous-requête qui compte les lignes dans la table `bookings` pour cet événement. Ce nombre est retourné sous le nom **`registered`**.
  - Chaque événement renvoyé a donc : `id`, `title`, `description`, `date`, `length`, `stock`, `illustration`, `location`, et **`registered`** (nombre de réservations).

#### 2) Backend – `back/src/controllers/events/eventsController.js`

- **Import** : ajout de `findAllPublishedEventsWithRegistered` (en plus de `findAllPublishedEvents`).
- **Route GET /api/events (fonction `getEvents`)**  
  - Avant : on appelait `findAllPublishedEvents()`.  
  - Après : on appelle **`findAllPublishedEventsWithRegistered()`**.  
  - Donc la réponse de l’API contient bien **`registered`** pour chaque événement.

#### 3) Front – `front/src/pages/Events.jsx`

- Pour chaque atelier affiché (quand `workshops.length > 0`), le texte « X places restantes » est calculé ainsi :
  - **Capacité** = `w.stock` (converti en nombre).
  - **Réservations** = `w.registered` (venu de l’API, défaut à 0 si absent).
  - **Places restantes** = `capacité − réservations`, avec `Math.max(0, ...)` pour ne jamais afficher un nombre négatif.
  - Affichage : « X place(s) restante(s) » (accord au pluriel si besoin).
- Si l’événement n’a pas de capacité (`stock` null), on affiche « — ».

Le modal de réservation appelle déjà **`getEvents().then(setWorkshops)`** dans **`onSuccess`** après une réservation. Donc après avoir réservé, la liste est rechargée, l’API renvoie les nouveaux `registered`, et les « X places restantes » se mettent à jour (par ex. 30 → 29).

En résumé : **l’API renvoie le nombre de réservations par événement**, et le front affiche **capacité − réservations** pour les places restantes. Après chaque réservation, le rechargement de la liste met à jour l’affichage.

---

## 6. Récapitulatif des fichiers modifiés

| Fichier | Modifications principales |
|---------|---------------------------|
| **`front/src/pages/Admin/AdminEvents.utils.js`** | Ajout de `getDayKeyFromDate`, `formatDayLabel`, `getDayTabsFromEvents` ; `DAY_TABS` avec clés en date (`2026-06-13`, `2026-06-14`). |
| **`front/src/pages/Admin/AdminEvents.jsx`** | Import des nouvelles fonctions ; state `day` initialisé avec la clé du premier onglet ; formulaire sans `day` ; normalisation des events avec `getDayKeyFromDate` ; `dayTabs` calculés avec `getDayTabsFromEvents` ; boutons d’onglets basés sur `dayTabs` ; après création `setDay(createdDay)` ; après édition mise à jour de `day` sur l’event ; `useEffect` pour recadrer l’onglet si invalide ; suppression du bloc « Journée » dans le modal. |
| **`back/src/models/event.js`** | Ajout de `findAllPublishedEventsWithRegistered()` (événements publiés + count des réservations en `registered`). |
| **`back/src/controllers/events/eventsController.js`** | Utilisation de `findAllPublishedEventsWithRegistered` dans `getEvents` pour que la réponse publique contienne `registered`. |
| **`front/src/pages/Events.jsx`** | Calcul des places restantes = `(stock ?? 0) - (registered ?? 0)` avec `Math.max(0, ...)` et affichage « X place(s) restante(s) ». |

Aucun autre fichier n’a été modifié pour ces trois blocs de fonctionnalités.

---

## 7. Comment tester

### Admin – Date et jour

1. Aller sur la page admin des événements.
2. Créer un nouvel événement en ne remplissant **que** la date/heure (ex. 20 octobre 2026, 10h00). Vérifier qu’il n’y a **pas** de champ « Journée » dans le formulaire.
3. Après création, un onglet pour le 20 octobre doit apparaître et l’événement doit s’afficher dans cet onglet.

### Admin – Onglets dynamiques

1. Créer des événements sur des jours différents (ex. 13 juin, 14 juin, 16 octobre).
2. Vérifier que les onglets en haut correspondent à ces jours, avec des libellés du type « Vendredi 16 octobre 2026 ».
3. Supprimer tous les événements d’un jour : l’onglet de ce jour doit disparaître et la sélection doit passer à un onglet encore valide.

### Page publique – Places restantes

1. Sur la page Événements (côté public), noter le nombre de « places restantes » pour un atelier (ex. 30).
2. Ouvrir le modal « Réserver sa place » et faire une réservation pour cet atelier.
3. Après fermeture du modal, la liste se recharge : le nombre de places restantes doit avoir diminué d’une unité (ex. 29).

---

## En résumé en une phrase par modification

- **Modif 1** : Le « jour » (onglet) en admin vient uniquement de la **date** de l’événement ; plus de champ « Journée » dans le formulaire.
- **Modif 2** : Les onglets en admin sont **calculés à partir des événements** (un onglet par jour qui a des événements), avec des libellés en français.
- **Modif 3** : Sur la page publique, les **places restantes** = capacité − nombre de réservations, grâce à l’API qui renvoie `registered` et au rechargement de la liste après réservation.

Si tu veux, on peut détailler un fichier ou une fonction en particulier pour ton explication (par exemple `getDayKeyFromDate` ou `getDayTabsFromEvents` ligne par ligne).
