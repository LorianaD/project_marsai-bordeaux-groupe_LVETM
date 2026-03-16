// src/server.js

import "dotenv/config"; // ⚠️ DOIT être chargé avant les autres imports

import app from "./app.js";
import { testConnection } from "./db/index.js";
import { startNewsletterCron } from "./jobs/newsletterCron.job.js";

// Lancement du cron pour les newsletters
startNewsletterCron();

console.log("HAS REFRESH TOKEN?", !!process.env.YOUTUBE_REFRESH_TOKEN);

const PORT = process.env.PORT;

if (!PORT) {
  console.log("PORT absent veuillez compléter le fichier .env");
  process.exit(1);
}

// ----------------------------
// Test de connexion MySQL
// ----------------------------
try {
  console.log("try dans server.js pour le test");
  await testConnection();
} catch (error) {
  console.error("Erreur connexion MySQL (raw):", error);
  console.error("name:", error?.name);
  console.error("code:", error?.code);
  console.error("errno:", error?.errno);
  console.error("sqlState:", error?.sqlState);
  console.error("message:", error?.message);
  process.exit(1);
}

// ----------------------------
// Lancement du serveur
// ----------------------------
app.listen(PORT, () => {
  console.log(`server lancé sur ${PORT}`);
});
