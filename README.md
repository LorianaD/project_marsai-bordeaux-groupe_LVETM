🚀 MarsAI – Festival de Courts Métrages IA

Plateforme web dédiée au festival MarsAI, permettant la soumission, la gestion et la valorisation de courts métrages générés par intelligence artificielle.

👥 Équipe

Projet réalisé par :
    Loriana,
    Vanessa,
    Edouard,
    Anthony,
    Mickael.

🏗 Architecture du projet

    marsai/
    │
    ├── front/        → Application React (Vite)
    ├── back/         → API Node.js / Express
    ├── db/           → Script SQL d’initialisation
    └── README.md

⚙️ Stack technique

    Frontend

        React (Vite)
        React Router
        Tailwind CSS
        i18next

    Backend

        Node.js
        Express
        MySQL
        JWT Authentication

📥 Installation

    1️⃣ Cloner le repository

        git clone git@github.com:LorianaD/project_marsai-bordeaux-groupe_LVETM.git

        cd project_marsai-bordeaux-groupe_LVETM

    2️⃣ Installer les dépendances

        Ouvrir deux terminaux :

            Terminal 1 – Frontend

                cd front
                npm install

            Terminal 2 – Backend

                cd back
                npm install

    ℹ️ Certaines dépendances peuvent générer des warnings.
    Cela n’empêche pas l’application de fonctionner.

🗄 Base de données

    Démarrer votre serveur local (MAMP, Laragon, XAMPP…).

        Ouvrir phpMyAdmin.

    Créer une base de données nommée :

        projet_marsai

    Importer le fichier .sql situé dans le dossier db.

🔐 Variables d’environnement

    Créer un fichier .env dans le dossier back/.

    Vous pouvez vous baser sur le fichier .env.example.

        Exemple .env.example
        # Server
        PORT=5000

        # Database
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=
        DB_NAME=projet_marsai
        DB_PORT=3306

        # JWT
        JWT_SECRET=your_super_secret_key
        JWT_REFRESH_SECRET=your_refresh_secret_key

        # Front URL (CORS)
        CLIENT_URL=http://localhost:5173

    ⚠️ Ne jamais commit le fichier .env.

▶️ Lancer le projet

    Dans les deux dossiers (front et back) :

        npm run dev

    Accéder à l’application :

        http://localhost:5173

    🧪 Environnement de développement

        Node >= 18 recommandé

        MySQL 8+

        npm >= 9

📦 Bonnes pratiques

    Ne pas modifier directement la base en production.

    Ne jamais exposer les variables sensibles.

    Toujours créer une branche pour les nouvelles fonctionnalités.
