import app from "./app.js"
import "dotenv/config";
import { testConnection } from "./db/index.js";

console.log("HAS REFRESH TOKEN?", !!process.env.YOUTUBE_REFRESH_TOKEN);

const PORT = process.env.PORT;

if (!PORT) {
  console.log("PORT absent veuillez compléter le fichier .env");
  process.exit(1);
}

// Test DB au démarrage
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

app.listen(PORT, ()=>{
  console.log(`server lancé sur ${PORT}`);
})