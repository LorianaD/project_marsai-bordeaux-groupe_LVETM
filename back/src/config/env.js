import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// __dirname = .../back/src/config
// backDir = .../back
const backDir = path.resolve(__dirname, "..", ".."); 
const envPath = path.join(backDir, ".env");

dotenv.config({ path: envPath });

const required = ["DB_HOST", "DB_USER", "DB_NAME", "DB_PORT", "JWT_SECRET"];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`${key} manquant dans le fichier .env (chargé: ${envPath})`);
  }
}

if (process.env.DB_PASSWORD === undefined) {
  throw new Error(`DB_PASSWORD manquant dans le fichier .env (chargé: ${envPath})`);
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET,
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME,
  },
};
